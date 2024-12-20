import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-appBg text-foreground p-5 rounded-lg">
          <main className="min-h-screen flex flex-col items-center space-y-3">
              <HeaderAuth />
              {children}
        </main>

      </body>
    </html>
  );
}
