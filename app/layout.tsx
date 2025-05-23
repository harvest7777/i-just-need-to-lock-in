import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";

import HeaderAuth from "@/components/header-auth";
import ThemeProvider from "./ThemeProvider";

import "./globals.css";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LOCK IN",
  description: "Hop off reels and lock in.",
  openGraph: {
    title: "LOCK IN",
    description: "Hop off reels and lock in.",
    url: "https://imalockin.com",
    images: [
      {
        url: "https://imalockin.com/lock-in-fr.png",
        width: 1200,
        height: 630,
        alt: "LOCK IN thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOCK IN",
    description: "Hop off reels and lock in.",
    images: ["https://imalockin.com/lock-in-fr.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-app-bg">
        <ThemeProvider>
          {/* switch to serverside? */}
          <div className="text-app-text md:p-2 p-2 rounded-lg select-none">
            {user && <HeaderAuth />}
            {children}
          </div>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
