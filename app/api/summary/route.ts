import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const botApiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || "https://heyattrangi-spaces-bot-heyattrangi-v4.hf.space";

export async function POST(req: NextRequest) {
    try {
        const { session_id } = await req.json();

        if (!session_id) {
            return NextResponse.json({ error: "session_id is required" }, { status: 400 });
        }

        try {
            const botResponse = await axios.post(`${botApiUrl}/summary`, {
                session_id: session_id
            });

            return NextResponse.json(botResponse.data);
        } catch (botErr: any) {
            console.error("Bot Summary API error:", botErr.message);
            return NextResponse.json({ error: "Failed to get summary from bot" }, { status: 502 });
        }

    } catch (err: any) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
