
import React from 'react';
import Image from 'next/image';

const HowWeCanHelp = () => {
    return (
        <div className="relative pt-24 pb-24">

            {/* Top Curved SVG Separator - Inverted curve to create the rising shape */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 bg-[#FFF7ED]">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#FFF7ED"
                    // The fill needs to match the previous section's background (#FFF7ED) to blend in.
                    // Wait, no. The section BELOW this separator has the image. The section ABOVE has #FFF7ED.
                    // So the SVG should likely be pointing DOWN or be part of the top of THIS section.
                    // Let's use a simpler approach: This section has a background image. 
                    // The top of this section should be curved.
                    ></path>
                </svg>
            </div>

            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/src6-2.png" // Using a placeholder image from assets
                    alt="Caring team background"
                    fill
                    className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-orange-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Custom SVG Shape Divider for the top to create the "Cut out" look */}
            <div className="absolute top-0 left-0 w-full z-10 text-[#FFF7ED]">
                <svg
                    className="w-full h-[80px] md:h-[120px]"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                >
                    {/* Inverse Hill Shape: Fills the top corners with #FFF7ED, revealing the image in a hill shape */}
                    <path
                        fill="currentColor"
                        d="M0,0 L1440,0 L1440,100 Q720,20 0,100 Z"
                    />
                </svg>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Want to understand how Hey Attrangi can help?
                </h2>
                <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg">
                    Whether you have a quick question or want help figuring out what kind of care is right for you, we're here to talk.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl p-8 text-left shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-2xl">
                            📞
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Book a free call with our coach
                        </h3>
                        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                            Our mental health coaches are licensed professionals who can help you understand what kind of care would work best for you.
                        </p>
                        <button className="border border-orange-500 text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors text-sm tracking-wide">
                            SEE AVAILABLE SLOTS
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl p-8 text-left shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 text-2xl">
                            💬
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Connect with our Care Team
                        </h3>
                        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                            Talk to Hey Attrangi's Care Team on WhatsApp or call to get help with any questions or guidance you may need.
                        </p>
                        <div className="flex gap-4">
                            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm tracking-wide flex items-center gap-2">
                                CALL US
                            </button>
                            <button className="border border-green-500 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors text-sm tracking-wide flex items-center gap-2">
                                CHAT WITH US
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowWeCanHelp;
