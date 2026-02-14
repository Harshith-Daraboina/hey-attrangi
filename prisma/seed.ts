import { PrismaClient } from '../app/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const visualQuestionsPath = path.join(process.cwd(), 'lib/iq-test/visualquestions.json');
    const questionsPath = path.join(process.cwd(), 'lib/iq-test/questions.json');

    const visualQuestions = JSON.parse(fs.readFileSync(visualQuestionsPath, 'utf-8'));
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

    // Combine question sets. Note: Logic for distinguishing types or domains is inside the objects.
    // visualQuestions likely has 'stimulus' fields, questions might be text-based.
    const allQuestions = [...visualQuestions, ...questions];

    // Clear existing IQ Test data
    console.log('Clearing old IQ test data...');
    await prisma.rawTrialData.deleteMany({});
    await prisma.testResult.deleteMany({});
    await prisma.testSession.deleteMany({});
    await prisma.visualQuestion.deleteMany({});

    console.log(`Seeding ${allQuestions.length} base questions...`);

    // Prepare data for batch creation
    // Note: createMany is supported by MongoDB in newer Prisma versions, but if there's complex logic inside map, we might need loops.
    // The original script used createMany for the bulk, then a loop for Matrix Reasoning.

    // Check if data needs transformation.
    // The original script had logic to default 'expectedTime' if missing.

    const dataToCreate = allQuestions.map((q: any) => {
        let expectedTime = q.expectedTimeMs;
        if (!expectedTime) {
            if (q.difficulty === 'easy') expectedTime = 5000;
            if (q.difficulty === 'medium') expectedTime = 10000;
            if (q.difficulty === 'hard') expectedTime = 20000;
            if (q.domain === 'processing_speed') expectedTime = 3000;
        }

        return {
            questionId: q.id,
            domain: q.domain,
            difficulty: q.difficulty,
            ageMin: q.age_min || 0,
            ageMax: q.age_max || 99,
            weight: q.weight || 1,
            prompt: q.prompt || "",
            stimulus: q.stimulus || {},
            options: q.choices || q.options || [],
            answer: q.answer ?? null,
            expectedTimeMs: expectedTime,
            explanation: q.explanation || null
        };
    });

    if (dataToCreate.length > 0) {
        await prisma.visualQuestion.createMany({
            data: dataToCreate
        });
    }

    console.log("Seeding Image-based Matrix Reasoning Questions...");
    // Seed 25 Image-based Matrix Reasoning Questions from IQ1
    // This logic relies on images existing in public/IQ1
    for (let i = 1; i <= 25; i++) {
        const questionId = `vis_mr_iq1_${i}`;

        // Use path to check for file existence in public folder
        const questionDir = path.join(process.cwd(), 'public', 'IQ1', 'questions', `${i}`);

        // Check how many option files exist (1.png, 2.png... and a.png)
        const options: string[] = [];
        // Typically max 8 options
        for (let j = 1; j <= 8; j++) {
            const potentialPath = path.join(questionDir, `${j}.png`);
            if (fs.existsSync(potentialPath)) {
                options.push(`${j}`);
            }
        }
        // Check for answer file 'a.png' - usually represents the correct answer visually, but 'answer' field stores the index/key.
        // In the original script: options.push('a') if a.png exists.
        // And answer was hardcoded to "a".
        // Let's stick to original logic.

        const answerPath = path.join(questionDir, `a.png`);
        if (fs.existsSync(answerPath)) {
            options.push('a');
        }

        // Fallback if no images found (e.g. if we are running in an env where public isn't checked or images missing)
        if (options.length === 0) {
            // Assume 6 options + answer for standard matrix
            options.push("1", "2", "3", "4", "5", "6", "a");
        }

        await prisma.visualQuestion.upsert({
            where: { questionId: questionId },
            update: {
                domain: 'matrix_reasoning',
                difficulty: i <= 8 ? 'easy' : (i <= 16 ? 'medium' : 'hard'),
                ageMin: 12,
                ageMax: 99,
                weight: 1,
                prompt: 'Choose the correct option to complete the pattern.',
                stimulus: {
                    type: 'image_pair',
                    question_image: `/IQ1/questions/${i}/q.png`,
                    options_base: `/IQ1/questions/${i}/`, // Base path for options
                },
                options: options,
                answer: "a", // Correct answer is always 'a' for this set (filename a.png)
            },
            create: {
                questionId: questionId,
                domain: 'matrix_reasoning',
                difficulty: i <= 8 ? 'easy' : (i <= 16 ? 'medium' : 'hard'),
                ageMin: 12,
                ageMax: 99,
                weight: 1,
                prompt: 'Choose the correct option to complete the pattern.',
                stimulus: {
                    type: 'image_pair',
                    question_image: `/IQ1/questions/${i}/q.png`,
                    options_base: `/IQ1/questions/${i}/`,
                },
                options: options,
                answer: "a",
            }
        });
    }

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
