// force reload
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, age } = body;

        if (!age) {
            return NextResponse.json({ error: 'Age is required' }, { status: 400 });
        }

        // Create a new session
        const session = await prisma.testSession.create({
            data: {
                userId: userId || 'anonymous',
                age: age,
                status: 'active',
                startedAt: new Date(),
                currentLog: []
            },
        });

        // Fetch all questions to ensure mix (excluding Load Induced Blindness initially if needed, but let's just fetch all valid ones)
        // We exclude 'load_induced_blindness' if it's not ready or special case, but let's keep it if available.
        // Assuming current implementation excluded it for a reason, but user requested "Load Induced Blindness" limits in previous turns.
        // Let's fetch all.
        const allQuestions = await prisma.visualQuestion.findMany({});

        // Define Distribution based on Age
        let distribution = {
            matrix: 2,
            memory: 5,
            speed: 4,
            attention: 4,
            numeric: 4,
            verbal: 2,
            logic: 2,
            integrated: 2,
            total: 25
        };

        // 1. Childhood (8-12) -> 15 Questions
        if (age >= 8 && age <= 12) {
            distribution = {
                matrix: 2,
                memory: 3, // Visual Working Memory
                speed: 3,
                attention: 3,
                numeric: 2,
                verbal: 1,
                logic: 1,
                integrated: 0,
                total: 15
            };
        }
        // 2. Adolescence (13-17) -> 20 Questions
        else if (age >= 13 && age <= 17) {
            distribution = {
                matrix: 2,
                memory: 4,
                speed: 4,
                attention: 4,
                numeric: 3,
                verbal: 2,
                logic: 1,
                integrated: 0,
                total: 20
            };
        }
        // 3. Adults (18-39) -> 25 Questions (Default)
        else if (age >= 18 && age <= 39) {
            distribution = {
                matrix: 2,
                memory: 5,
                speed: 4,
                attention: 4,
                numeric: 4,
                verbal: 3,
                logic: 2,
                integrated: 1,
                total: 25
            };
        }
        // 4. Older Adults (40+) -> 20 Questions
        else if (age >= 40) {
            distribution = {
                matrix: 2,
                memory: 4,
                speed: 3,
                attention: 4,
                numeric: 3,
                verbal: 3,
                logic: 1,
                integrated: 0,
                total: 20
            };
        }


        // Helper to shuffle array
        const shuffle = (array: any[]) => array.sort(() => 0.5 - Math.random());

        // Select questions for each category
        const select = (domainFilter: (q: any) => boolean, count: number) => {
            const available = allQuestions.filter(domainFilter);
            return shuffle(available).slice(0, count);
        };

        // Note: We need to map domain names correctly to what's in DB
        // DB domains: matrix_reasoning, working_memory_visual, processing_speed, attention, numeric, verbal, logic, integrated_reasoning
        // Also: load_induced_blindness, memorability, multiple_object_tracking, go_no_go, enumeration, task_switching

        // Group domains
        const groups = {
            matrix: ['matrix_reasoning'],
            memory: ['working_memory_visual', 'memorability', 'working_memory'],
            speed: ['processing_speed', 'enumeration', 'symbol_search'], // task_switching might be logic or speed? User put logic/task_switching in previous code. Let's put task_switching in Speed/Attention or Logic? User said "Cognitive Flexibility" -> Task Switching. Let's put it in Logic or specific?
            // User request: "Visual Matrix / Pattern", "Working Memory", "Processing Speed", "Attention", "Numeric", "Verbal", "Logic", "Integrated".
            // Let's stick to standard mappings.
            attention: ['attention', 'multiple_object_tracking', 'go_no_go'],
            numeric: ['numeric'],
            verbal: ['verbal'],
            logic: ['logic', 'task_switching'], // Task switching often considered executive function/logic
            integrated: ['integrated_reasoning']
        };

        const selectedQuestions = [
            ...select(q => groups.matrix.includes(q.domain), distribution.matrix),
            ...select(q => groups.memory.includes(q.domain), distribution.memory),
            ...select(q => groups.speed.includes(q.domain), distribution.speed),
            ...select(q => groups.attention.includes(q.domain), distribution.attention),
            ...select(q => groups.numeric.includes(q.domain), distribution.numeric),
            ...select(q => groups.verbal.includes(q.domain), distribution.verbal),
            ...select(q => groups.logic.includes(q.domain), distribution.logic),
            ...select(q => groups.integrated.includes(q.domain), distribution.integrated)
        ];

        // Advanced Shuffling / Sorting Logic
        // Rule: Never show same domain back-to-back
        // Rule: No more than 2 heavy reasoning tasks in a row (matrix, logic, numeric, integrated)

        const heavyDomains = [...groups.matrix, ...groups.logic, ...groups.numeric, ...groups.integrated];

        const smartShuffle = (questions: any[]) => {
            // Attempt to shuffle with constraints up to 10 times
            for (let attempt = 0; attempt < 10; attempt++) {
                const pool = shuffle([...questions]);
                const result: any[] = [];
                let success = true;

                // Helper to check if a question is valid at current position
                const isValid = (q: any, index: number) => {
                    const prev = result[index - 1];
                    const prev2 = result[index - 2];

                    if (!prev) return true;

                    // 1. General Rule: Try to avoid same domain back-to-back
                    if (prev.domain === q.domain) {
                        // STRICT Rule for Matrix: Never more than 2 in a row
                        if (q.domain === 'matrix_reasoning' && prev2 && prev2.domain === 'matrix_reasoning') {
                            return false;
                        }
                        // Soft Rule for others: Try to avoid 1 in a row, but if we really must, allow it (handled by pool logic? No, this is boolean validity)
                        // Let's enforce strictly No Back-to-Back for everything if possible
                        return false;
                    }

                    // 2. Max 2 heavy in a row
                    const isHeavy = heavyDomains.includes(q.domain);
                    if (isHeavy && prev && heavyDomains.includes(prev.domain) && prev2 && heavyDomains.includes(prev2.domain)) {
                        return false;
                    }

                    return true;
                };

                while (pool.length > 0) {
                    let pickedIndex = -1;

                    // Try to find a valid candidate
                    for (let i = 0; i < pool.length; i++) {
                        if (isValid(pool[i], result.length)) {
                            pickedIndex = i;
                            break;
                        }
                    }

                    if (pickedIndex === -1) {
                        // Constraint failed for this attempt
                        success = false;
                        break;
                    }

                    result.push(pool[pickedIndex]);
                    pool.splice(pickedIndex, 1);
                }

                if (success) return result;
            }

            // Fallback: Just shuffle randomly if constraints effectively impossible
            return shuffle(questions);
        };

        const finalQuestions = smartShuffle(selectedQuestions);

        return NextResponse.json({
            sessionId: session.id,
            questions: finalQuestions
        });

    } catch (error) {
        console.error('Error starting test:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
