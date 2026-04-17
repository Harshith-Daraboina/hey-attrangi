import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const mongoUri = process.env.DATABASE_URL!;
const botApiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || "https://heyattrangi-spaces-bot-heyattrangi-v4.hf.space";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

async function getMongoClient() {
    if (client) return client;
    if (!clientPromise) {
        clientPromise = MongoClient.connect(mongoUri);
    }
    client = await clientPromise;
    return client;
}

export async function POST(req: NextRequest) {
    try {
        const { visitor_id, message } = await req.json();

        if (!visitor_id || !message) {
            return NextResponse.json({ error: "visitor_id and message are required" }, { status: 400 });
        }

        const mongoClient = await getMongoClient();
        const db = mongoClient.db();
        const visitors = db.collection('visitors');

        // Ensure indexes
        await visitors.createIndex({ visitor_id: 1 }, { unique: true });
        await visitors.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });

        const now = new Date();
        const visitor = await visitors.findOne({ visitor_id });

        if (!visitor) {
            // New visitor: create record
            await visitors.insertOne({
                visitor_id,
                count: 1,
                createdAt: now
            });
        } else {
            // Existing visitor
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            if (visitor.createdAt < twentyFourHoursAgo) {
                // Reset count if older than 24 hours
                await visitors.updateOne(
                    { visitor_id },
                    { $set: { count: 1, createdAt: now } }
                );
            } else {
                // Within 24 hours
                if (visitor.count >= 5) {
                    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
                }
                // Increment count
                await visitors.updateOne(
                    { visitor_id },
                    { $inc: { count: 1 } }
                );
            }
        }

        // Get updated count for "remaining"
        const updatedVisitor = await visitors.findOne({ visitor_id });
        const remaining = 5 - (updatedVisitor?.count || 0);

        // Proxy to Bot API
        try {
            const botResponse = await axios.post(`${botApiUrl}/chat`, {
                session_id: visitor_id,
                message: message
            });

            return NextResponse.json({
                reply: botResponse.data.reply,
                remaining: Math.max(0, remaining),
                expression: botResponse.data.expression
            });
        } catch (botErr: any) {
            console.error("Bot API error:", botErr.message);
            return NextResponse.json({ error: "Failed to get response from bot" }, { status: 502 });
        }

    } catch (err: any) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
