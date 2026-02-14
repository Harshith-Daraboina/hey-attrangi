interface Question {
    id: string; // database id or visualId
    domain: string;
    difficulty: string;
}

interface PerformanceHistory {
    [domain: string]: {
        correct: number;
        total: number;
        streak: number;
    }
}

export class AdaptiveEngine {
    private history: PerformanceHistory = {};

    constructor() { }

    recordAnswer(domain: string, isCorrect: boolean) {
        if (!this.history[domain]) {
            this.history[domain] = { correct: 0, total: 0, streak: 0 };
        }

        const d = this.history[domain];
        d.total++;
        if (isCorrect) {
            d.correct++;
            d.streak++;
        } else {
            d.streak = 0;
        }
    }

    getNextDifficulty(domain: string, currentDifficulty: string): string {
        const d = this.history[domain];
        if (!d) return 'medium'; // Default start

        // Increase difficulty after streak of 3 correct
        if (d.streak >= 3) {
            if (currentDifficulty === 'easy') return 'medium';
            if (currentDifficulty === 'medium') return 'hard';
        }

        // Decrease difficulty if accuracy drops below 50% (min 4 trials)
        if (d.total >= 4 && (d.correct / d.total) <= 0.5) {
            if (currentDifficulty === 'hard') return 'medium';
            if (currentDifficulty === 'medium') return 'easy';
        }

        return currentDifficulty;
    }

    selectNextQuestion(availableQuestions: Question[], currentDomain: string, currentDifficulty: string): Question | null {
        const nextDiff = this.getNextDifficulty(currentDomain, currentDifficulty);

        // Filter by domain and difficulty
        let candidates = availableQuestions.filter(q => q.domain === currentDomain && q.difficulty === nextDiff);

        if (candidates.length === 0) {
            // Fallback: try same difficulty if target missing
            candidates = availableQuestions.filter(q => q.domain === currentDomain && q.difficulty === currentDifficulty);
        }

        if (candidates.length === 0) return null;

        // Return random candidate
        const randomIndex = Math.floor(Math.random() * candidates.length);
        return candidates[randomIndex];
    }
}
