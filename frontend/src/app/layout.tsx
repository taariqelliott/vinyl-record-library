import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crate Keeper",
  description: "By Taariq Elliott",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", poppins.className)}
    >
      <link rel="icon" href="/vr.png" sizes="any" />
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="h-0.5 bg-linear-to-r from-rose-500 via-rose-400 to-rose-500" />
            <div className="flex h-16 items-center justify-between px-6">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-rose-500 text-white shadow-md shadow-rose-500/20 transition-transform group-hover:scale-105">
                  <Disc3 className="size-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Crate<span className="text-rose-500">Keeper</span>
                </span>
              </Link>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
