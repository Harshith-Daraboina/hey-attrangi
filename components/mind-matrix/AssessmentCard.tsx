import Link from 'next/link';
import { ClipboardList } from 'lucide-react';

interface AssessmentCardProps {
    title: string;
    description: string;
    image: string;
    duration: string;
    href: string;
}

export default function AssessmentCard({ title, description, image, duration, href }: AssessmentCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col items-start h-full hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-slate-700 mb-3 leading-snug">{title}</h3>
            <p className="text-slate-500 text-[0.95rem] mb-6 leading-relaxed flex-grow">{description}</p>

            <div className="flex justify-between items-end w-full mt-auto">
                <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col items-end justify-end pb-1">
                    <div className="flex items-center text-xs font-medium text-slate-500 mb-4">
                        <ClipboardList className="w-4 h-4 mr-1.5 opacity-60" />
                        {duration}
                    </div>
                    <Link
                        href={href}
                        className="text-xs font-bold text-[#EF5A42] uppercase tracking-wide border-b-2 border-[#EF5A42]/20 hover:border-[#EF5A42] pb-0.5 transition-colors"
                    >
                        TAKE ASSESSMENT
                    </Link>
                </div>
            </div>
        </div>
    );
}
