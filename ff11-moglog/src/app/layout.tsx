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
  title: "Moglog",
  description: "Moglog - Final Fantasy XI Community Hub",
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
      </body>
    </html>
  );
}
