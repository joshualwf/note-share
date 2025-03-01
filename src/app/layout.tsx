import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { MainNav } from "@/components/MainNav";
import { Search } from "@/components/Search";
import { UserNav } from "@/components/UserNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note Share",
  description: "A platform for students to share resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <img
                  src="https://media.tenor.com/mTz7WCbH92oAAAAj/book-transparent.gif"
                  alt="a drawing of an open book with a shadow on it"
                  className="h-full max-h-full"
                />
                <h2 className="text-lg font-semibold">NoteShare</h2>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
