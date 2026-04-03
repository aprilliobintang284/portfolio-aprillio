import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // --- INI YANG DIUBAH ---
  title: "Porto April", // Teks yang muncul di tab browser
  description: "Aprillio Bintang Perdana - QA Specialist & Gaming Content Creator Portfolio",
  // -----------------------
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 antialiased`}>{children}</body>
    </html>
  );
}