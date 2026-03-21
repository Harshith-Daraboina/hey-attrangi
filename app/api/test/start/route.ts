import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

/** Mind Matrix: fixed 12-question check-in, 3-minute cap (enforced client-side). */
const MIND_MATRIX_TOTAL = 12;
const TIME_LIMIT_SECONDS = 180;
const SELECTION_MODE = 'random_balanced' as const;

const PER_CATEGORY = 4;

const EXCLUDED_DOMAINS = new Set([
    'multiple_object_tracking',
    'working_memory_visual',
    'go_no_go',
    'memorability',
    'task_switching',
    'load_induced_blindness',
    'integrated_reasoning',
    'working_memory',
    'numeric',
    'verbal',
    'attention',
]);

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function pickRandom<T>(pool: T[], count: number): T[] {
    return shuffle(pool).slice(0, count);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, age } = body;

        const resolvedAge =
            typeof age === "number" && !Number.isNaN(age) ? age : 25;

        const session = await prisma.testSession.create({
            data: {
                userId: userId || 'anonymous',
                age: resolvedAge,
                status: 'active',
                startedAt: new Date(),
                currentLog: []
            },
        });

        const allQuestions = await prisma.visualQuestion.findMany({});

        const eligible = allQuestions.filter((q) => !EXCLUDED_DOMAINS.has(q.domain));

        const matrixPool = eligible.filter((q) => q.domain === 'matrix_reasoning');
        const logicPool = eligible.filter((q) => q.domain === 'logic');
        const processingPool = eligible.filter(
            (q) => q.domain === 'processing_speed' || q.domain === 'enumeration'
        );

        if (matrixPool.length < PER_CATEGORY || logicPool.length < PER_CATEGORY || processingPool.length < PER_CATEGORY) {
            console.error('Mind Matrix: insufficient pool', {
                matrix: matrixPool.length,
                logic: logicPool.length,
                processing: processingPool.length,
            });
            return NextResponse.json(
                { error: "Mind Matrix couldn't start your Mind Check right now. Please try again in a little while." },
                { status: 503 }
            );
        }

        const matrixPick = pickRandom(matrixPool, PER_CATEGORY);
        const logicPick = pickRandom(logicPool, PER_CATEGORY);
        const processingPick = pickRandom(processingPool, PER_CATEGORY);

        const combined = [...matrixPick, ...logicPick, ...processingPick];

        const seen = new Set<string>();
        const unique = combined.filter((q) => {
            if (seen.has(q.questionId)) return false;
            seen.add(q.questionId);
            return true;
        });

        if (unique.length !== MIND_MATRIX_TOTAL) {
            console.error('Mind Matrix: duplicate questionIds after selection', unique.length);
            return NextResponse.json(
                { error: 'Question selection failed. Please try again.' },
                { status: 500 }
            );
        }

        const finalQuestions = shuffle(unique);

        return NextResponse.json({
            sessionId: session.id,
            questions: finalQuestions,
            config: {
                totalQuestions: MIND_MATRIX_TOTAL,
                timeLimitSeconds: TIME_LIMIT_SECONDS,
                selectionMode: SELECTION_MODE,
            },
        });

    } catch (error) {
        console.error('Error starting test:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
