import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";

const nunito_sans = Nunito_Sans({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  title: "LLM Comparison",
  description: "LLM Comparison is a web application that allows users to compare responses from leading Large Language Models (LLMs) such as OpenAI's ChatGPT, Google's Gemini, and Anthropic's Claude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito_sans.className} >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
