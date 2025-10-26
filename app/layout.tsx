import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hey Attrangi - Support for Neurodivergent Individuals | Psychological Resources",
  description: "Comprehensive support platform for neurodivergent individuals. Access self-help resources, therapy connections, community support, and awareness content. Professional psychological services and neurodivergent-friendly tools.",
  keywords: "neurodivergent, psychological support, therapy, autism, ADHD, mental health, self-help, community support, psychological resources, neurodivergent-friendly",
  authors: [{ name: "Hey Attrangi Team" }],
  openGraph: {
    title: "Hey Attrangi - Support for Neurodivergent Individuals",
    description: "Comprehensive support platform for neurodivergent individuals with self-help resources, therapy connections, and community support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`antialiased ${poppins.className}`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
