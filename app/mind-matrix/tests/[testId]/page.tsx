import { notFound, redirect } from "next/navigation";
import QuestionnaireEngine from "@/components/mind-matrix/QuestionnaireEngine";

interface TestPageProps {
    params: Promise<{
        testId: string;
    }>;
}

export default async function TestPage({ params }: TestPageProps) {
    const { testId } = await params;

    if (testId === "iq" || testId === "mind-matrix") {
        redirect("/mind-matrix");
    }

    let testData: any;

    try {
        switch (testId) {
            case 'adhd':
                testData = (await import('@/public/src/adhd/vanderbilt_structured.json')).default || await import('@/public/src/adhd/vanderbilt_structured.json');
                break;
            case 'anxiety':
                testData = (await import('@/public/src/anxiety/gad7_structured.json')).default || await import('@/public/src/anxiety/gad7_structured.json');
                break;
            case 'depression':
                testData = (await import('@/public/src/depression/phq9_structured.json')).default || await import('@/public/src/depression/phq9_structured.json');
                break;
            case 'autism':
                testData = (await import('@/public/src/autism/aq_structured.json')).default || await import('@/public/src/autism/aq_structured.json');
                break;
            case 'ocd':
                testData = {
                    scale: "OCD Symptoms Check (OCI-R)",
                    response_scale: { "0": "Not at all", "1": "A little", "2": "Moderately", "3": "A lot", "4": "Extremely" },
                    questions: [
                        { id: 1, text: "I have saved up so many things that they get in the way.", domain: "Hoarding" },
                        { id: 2, text: "I check things more often than necessary.", domain: "Checking" },
                        { id: 3, text: "I get upset if objects are not arranged properly.", domain: "Ordering" },
                        { id: 4, text: "I feel compelled to count while I am doing things.", domain: "Neutralizing" },
                        { id: 5, text: "I find it difficult to touch an object when I know it has been touched by strangers or certain people.", domain: "Washing" },
                        { id: 6, text: "I find it difficult to control my own thoughts.", domain: "Obsessing" }
                    ],
                    scoring: { method: "sum" }
                };
                break;
            case 'personality':
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
                break;
            default:
                return notFound();
        }
    } catch (error) {
        console.error("Error reading test data:", error);
        return <div>Error loading test data.</div>;
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
