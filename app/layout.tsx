import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

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
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
