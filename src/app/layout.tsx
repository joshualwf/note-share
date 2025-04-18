import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MainNav } from "@/components/MainNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { UserNav } from "@/components/UserNav";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { UserProvider } from "./UserContext";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Note Share",
  description: "A platform for students to share resources",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full ${inter.className}`}
    >
      <body className="flex flex-col h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <div className="flex-col md:flex">
              <div className="border-b">
                <div className="flex h-16 items-center pr-4 pl-2">
                  <Link className="flex h-16 items-center" href="/">
                    <Image
                      src="/icon9.png"
                      alt="nerd icon"
                      width={40}
                      height={40}
                    />
                    <h2 className="text-lg font-semibold ml-1">NoteShare</h2>
                  </Link>
                  <MainNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-2">
                    <ModeToggle />
                    <UserNav />
                  </div>
                </div>
              </div>
            </div>
            <div className="grow flex flex-col h-0 min-h-0 overflow-auto">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
          </UserProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
