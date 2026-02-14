import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';
import VisualTestEngine from "@/components/iq-test/VisualTestEngine";
import QuestionnaireEngine from "@/components/iq-test/QuestionnaireEngine";

interface TestPageProps {
    params: Promise<{
        testId: string;
    }>;
}

export default async function TestPage({ params }: TestPageProps) {
    const { testId } = await params;

    if (testId === 'iq') {
        return <VisualTestEngine />;
    }

    // Map test IDs to file paths
    const textTests: Record<string, string> = {
        'adhd': 'public/src/adhd/vanderbilt_structured.json',
        'anxiety': 'public/src/anxiety/gad7_structured.json',
        'depression': 'public/src/depression/phq9_structured.json',
        'autism': 'public/src/autism/aq_structured.json',
        // Mock personality for now
        'personality': 'mock'
    };

    const filePath = textTests[testId];

    if (!filePath) {
        return notFound();
    }

    let testData;

    if (filePath === 'mock') {
        testData = {
            scale: "Big Five Personality Test",
            response_scale: { "1": "Disagree", "2": "Neutral", "3": "Agree" },
            questions: [
                { id: 1, text: "I am the life of the party.", domain: "Extroversion" },
                { id: 2, text: "I feel little concern for others.", domain: "Agreeableness" },
                { id: 3, text: "I am always prepared.", domain: "Conscientiousness" },
                { id: 4, text: "I get stressed out easily.", domain: "Neuroticism" },
                { id: 5, text: "I have a rich vocabulary.", domain: "Openness" },
            ],
            scoring: { method: "sum" }
        };
    } else {
        try {
            const jsonPath = path.join(process.cwd(), filePath);
            const fileContents = await fs.readFile(jsonPath, 'utf8');
            testData = JSON.parse(fileContents);
        } catch (error) {
            console.error("Error reading test data:", error);
            return <div>Error loading test data.</div>;
        }
    }

    return (
        <QuestionnaireEngine
            title={testData.scale || "Assessment"}
            questions={testData.questions}
            responseScale={testData.response_scale}
            scoring={testData.scoring}
            severityCutoffs={testData.severity_cutoffs}
        />
    );
}
