import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
      <body className="bg-appBg text-foreground p-5 rounded-lg">
            <HeaderAuth />
            {children}
      </body>
    </html>
  );
}
