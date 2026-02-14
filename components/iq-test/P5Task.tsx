"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';

interface P5TaskProps {
    sketch: string;
    extraScripts?: string[];
    onComplete?: (results: any) => void;
}

declare global {
    interface Window {
        p5: any;
        taskResults: any;
        setup: any;
        draw: any;
        mousePressed: any;
        keyPressed: any;
        windowResized: any;
    }
}

export default function P5Task({ sketch, extraScripts = [], onComplete }: P5TaskProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        // Cleanup function to remove p5 instance when component unmounts
        return () => {
            if (window.p5 && window.p5.instance) {
                window.p5.instance.remove();
            }
            // Also clean up global functions to avoid pollution
            // delete window.setup;
            // delete window.draw;
            // delete window.mousePressed;
            // delete window.keyPressed;
        };
    }, []);

    const handleScriptLoad = () => {
        setScriptsLoaded(true);
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center bg-white border border-gray-200 rounded-lg overflow-hidden">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // check if p5 is loaded
                    if (window.p5) console.log("p5 loaded");
                }}
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"
                strategy="lazyOnload"
            />

            {extraScripts.map((src, index) => (
                <Script
                    key={index}
                    src={src}
                    strategy="lazyOnload"
                />
            ))}

            <Script
                src={sketch}
                strategy="lazyOnload"
                onLoad={handleScriptLoad}
            />

            <div id="p5-canvas-container" ref={containerRef} className="absolute inset-0 flex items-center justify-center">
                {!scriptsLoaded && (
                    <div className="text-white text-xl animate-pulse">Loading Task Environment...</div>
                )}
            </div>
        </div>
    );
}
