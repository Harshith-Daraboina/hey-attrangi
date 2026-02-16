import Image from 'next/image';
import Link from 'next/link';

export default function AppPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4">
            <div className="text-center space-y-6 max-w-2xl">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                        src="/images/logo-vertical.png"
                        alt="Hey Attrangi Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-[#1a2b3c] font-poppins">
                    app.heyattrangi.com
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 font-medium animate-pulse">
                    soon be coming for onbarding......
                </p>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium border-b border-transparent hover:border-orange-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
