import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import ThemeProvider from "./ThemeProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LOCK IN",
  description: "DO NOT SCROLL REELS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-app-bg text-app-text md:p-2 p-2 rounded-lg">
        {/* switch to serverside? */}
        <ThemeProvider>
          <HeaderAuth />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
