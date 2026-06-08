import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { ColorThemeProvider } from "./components/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porto April ",
  description: "Aprillio Bintang Perdana — QA Specialist & Freelance Gaming Content Creator. Portfolio, Projects, dan Creator Content. Tersedia untuk kolaborasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      {/* Blocking script: apply theme BEFORE first paint to prevent orange flash */}
      <script dangerouslySetInnerHTML={{__html:`(function(){try{var t=localStorage.getItem('color-theme');if(t==='green')document.documentElement.setAttribute('data-color-theme','green');}catch(e){}})();`}} />
      <body className={`${inter.className} antialiased`}>
        <CustomCursor />
        <ColorThemeProvider>
          {children}
        </ColorThemeProvider>
      </body>
    </html>
  );
}