import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { COMPANY } from "@/lib/company";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "dumpster rental",
    "waste management",
    "trash pickup",
    "residential waste",
    "commercial dumpster",
    "roll-off dumpster",
    "Northern Colorado",
    "Windsor CO",
    "Fort Collins CO",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.website,
    siteName: COMPANY.name,
    title: COMPANY.name,
    description: COMPANY.description,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY.name,
    description: COMPANY.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${COMPANY.analytics.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${COMPANY.analytics.googleAnalyticsId}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-inter`}>
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-transparent flex flex-col">
              <Suspense fallback={<div className="h-16 bg-white" />}>
                <Header />
              </Suspense>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
