import Link from 'next/link';
import { ReactNode } from 'react';

interface TestCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    color?: string; // Kept for compatibility but optional/ignored
    buttonText?: string;
}

export default function TestCard({ title, description, icon, href, buttonText = "Take Test" }: TestCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start h-full hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl mb-4">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">{description}</p>

            <Link
                href={href}
                className="w-full py-2.5 px-4 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm shadow-orange-100"
            >
                {buttonText}
                <svg className="w-4 h-4 bg-white/20 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
        </div>
    );
}
