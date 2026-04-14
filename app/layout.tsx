import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hey Attrangi",
    default: "Hey Attrangi - Mental Health & Therapy Space",
  },
  description:
    "Hey Attrangi provides professional therapy, online consultations, and free mental health resources. Support your emotional wellbeing with gentle check-ins and expert care.",
  keywords: "your mental health companion, psychological support, therapy, autism, ADHD, mental health, self-help, community support, psychological resources, companion-friendly",
  authors: [{ name: "Hey Attrangi Team" }],
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "96x96",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Hey Attrangi - Your Mental Health Companion",
    description: "Comprehensive support platform with your mental health companion, providing self-help resources, therapy connections, and community support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className={`antialiased ${manrope.className}`}>
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