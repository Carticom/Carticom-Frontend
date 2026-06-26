import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carticom - Commerce Operating System for Africa",
  description: "Build, sell, manage and scale your business with Carticom. The all-in-one commerce platform for African businesses.",
  keywords: ["commerce", "africa", "ecommerce", "payments", "escrow", "ai", "business"],
  authors: [{ name: "Carticom" }],
  openGraph: {
    title: "Carticom - Commerce Operating System for Africa",
    description: "Build, sell, manage and scale your business with Carticom.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carticom - Commerce Operating System for Africa",
    description: "Build, sell, manage and scale your business with Carticom.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
          theme="light"
        />
      </body>
    </html>
  );
}