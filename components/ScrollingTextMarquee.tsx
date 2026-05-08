import React from 'react';

const ScrollingTextMarquee = () => {
    const items = [
        "IIT Guwahati",
        "IIIT Dharwad",
        "Dharwad Institute Of Mental Health And Neurosciences"
    ];

    return (
        <div className="w-full bg-[#fff9f1]/60 border-y border-orange-100/50 overflow-hidden py-5 -mt-10 mb-14 relative z-20 backdrop-blur-sm">
            <div className="flex overflow-hidden group">
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused] px-8">
                    {[...items, ...items].map((item, index) => (
                        <span key={`original-${index}`} className="text-sm md:text-base font-semibold text-orange-900/40 whitespace-nowrap tracking-wide">
                            {item}
                        </span>
                    ))}
                </div>
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused] px-8">
                    {[...items, ...items].map((item, index) => (
                        <span key={`duplicate-${index}`} className="text-sm md:text-base font-semibold text-orange-900/40 whitespace-nowrap tracking-wide">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingTextMarquee;
