import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react"

import HeaderAuth from "@/components/header-auth";
import ThemeProvider from "./ThemeProvider";
import PreventExit from "./PreventExit";

import "./globals.css";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LOCK IN",
  description: "DO NOT SCROLL REELS",
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
      <body className="bg-app-bg text-app-text md:p-2 p-2 rounded-lg">
        <PreventExit>
          <ThemeProvider>
            {/* switch to serverside? */}
            {user && <HeaderAuth />}
            {children}
            <Analytics />
          </ThemeProvider>
        </PreventExit>
      </body>
    </html>
  );
}
