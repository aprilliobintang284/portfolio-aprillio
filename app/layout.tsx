import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { ColorThemeProvider } from "./components/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aprillio Bintang — QA Specialist & Content Creator",
  description:
    "Aprillio Bintang Perdana — Quality Assurance Specialist & Gaming Content Creator. Personal Portfolio & Selected Work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <CustomCursor />
        <ColorThemeProvider>{children}</ColorThemeProvider>
      </body>
    </html>
  );
}