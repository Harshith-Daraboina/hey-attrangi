import React from 'react';

const ScrollingTextMarquee = () => {
    const items = [
        "IIT Guwahati",
        "IIIT Dharwad",
        "Dharwad Institute Of Mental Health And Neurosciences"
    ];

    return (
        <div className="w-full bg-orange-50/50 border-y border-orange-100/50 overflow-hidden py-4 -mt-10 mb-10 relative z-20 backdrop-blur-sm">
            <div className="flex overflow-hidden group">
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused] px-8">
                    {[...items, ...items].map((item, index) => (
                        <span key={`original-${index}`} className="text-lg md:text-xl font-medium text-orange-900/60 whitespace-nowrap">
                            {item}
                        </span>
                    ))}
                </div>
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 group-hover:[animation-play-state:paused] px-8">
                    {[...items, ...items].map((item, index) => (
                        <span key={`duplicate-${index}`} className="text-lg md:text-xl font-medium text-orange-900/60 whitespace-nowrap">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingTextMarquee;
