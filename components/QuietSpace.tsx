import { Sun } from "lucide-react";

export default function QuietSpace() {
    return (
        <section className="py-24 bg-gradient-to-b from-orange-50/50 to-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

                    {/* Bell Curve Illustration */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative group">
                        {/* Faded overlay */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:backdrop-blur-none group-hover:bg-transparent pointer-events-none">
                        </div>

                        {/* The SVG Graphic */}
                        <div className="relative w-full max-w-[500px] opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                            <svg viewBox="0 0 540 260" className="w-full h-auto drop-shadow-sm">
                                {/* Grid Lines */}
                                <line x1="135" y1="50" x2="135" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="202.5" y1="50" x2="202.5" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="270" y1="20" x2="270" y2="210" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                                <line x1="337.5" y1="50" x2="337.5" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="405" y1="50" x2="405" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                                {/* Baseline */}
                                <line x1="50" y1="210" x2="490" y2="210" stroke="#94A3B8" strokeWidth="2" />

                                {/* Curve */}
                                <path d="M50 210 C 150 210, 180 40, 270 40 C 360 40, 390 210, 490 210" fill="none" stroke="#3B82F6" strokeWidth="3" />

                                {/* Percentages */}
                                <text x="80" y="190" fontSize="14" fill="#475569" fontWeight="bold">0.1%</text>
                                <text x="145" y="170" fontSize="14" fill="#475569" fontWeight="bold">2.1%</text>
                                <text x="210" y="110" fontSize="14" fill="#475569" fontWeight="bold">13.6%</text>
                                <text x="270" y="32" fontSize="16" fill="#1E293B" fontWeight="bold" textAnchor="middle">34.1%</text>
                                <text x="330" y="110" fontSize="14" fill="#475569" fontWeight="bold">13.6%</text>
                                <text x="390" y="170" fontSize="14" fill="#475569" fontWeight="bold">2.1%</text>
                                <text x="450" y="190" fontSize="14" fill="#475569" fontWeight="bold">0.1%</text>

                                {/* Values */}
                                <text x="135" y="235" fontSize="14" fill="#64748B" textAnchor="middle">70</text>
                                <text x="202.5" y="235" fontSize="14" fill="#64748B" textAnchor="middle">85</text>
                                <text x="270" y="235" fontSize="16" fill="#1E293B" fontWeight="bold" textAnchor="middle">100</text>
                                <text x="337.5" y="235" fontSize="14" fill="#64748B" textAnchor="middle">115</text>
                                <text x="405" y="235" fontSize="14" fill="#64748B" textAnchor="middle">130</text>
                            </svg>
                        </div>
                    </div>

                    {/* Quiet Space Card */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div className="bg-gradient-to-br from-[#ffffff] to-[#faf8f6] w-full max-w-[420px] aspect-[4/3] rounded-[36px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/80 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden transition-transform duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:-translate-y-1 group">

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-[72px] h-[72px] bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-50 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300">
                                    <Sun className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                                </div>

                                <p className="text-[#5b6a7a] text-lg font-medium leading-[1.6] max-w-[300px]">
                                    A quiet space for you. No rankings, no curves, no comparing yourself to anyone else.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
