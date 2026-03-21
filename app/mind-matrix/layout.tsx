import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Mind Matrix",
    description:
        "Mind Matrix offers Mind Check: a short, private pause to notice how you feel mentally today. Not a test, ranking, or diagnosis.",
    keywords: [
        "Mind Matrix",
        "Mind Check",
        "mental health check-in",
        "wellbeing",
        "Hey Attrangi",
    ],
};

export default function MindMatrixLayout({ children }: { children: ReactNode }) {
    return children;
}
