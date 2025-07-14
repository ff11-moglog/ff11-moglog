import Header from "../components/Header";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: [
    { rel: "icon", url: "/moglogicon.png", type: "image/png" },
    { rel: "shortcut icon", url: "/moglogicon.png", type: "image/png" },
  ],
  other: {
    "google-site-verification": "goakkrhm4gyd2Xl_P03Q7rshD66t1-0ZlRAVX0tS91M"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        
        {/* フッター */}
        <footer className="w-full bg-[#f7f3e7] border-t border-[#e0e0c0] text-yellow-900 text-xs md:text-sm py-4 flex flex-col items-center font-semibold">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4">
            <span>© 2025 Moglog / FINAL FANTASY XI Community Fan Project</span>
            <span>
              <a href="https://www.playonline.com/ff11/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">公式サイト</a>
              <span className="mx-2">|</span>
              <a href="https://wiki.ffo.jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-700">FF11用語辞典</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
