import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App | Modern Task Manager',
  description: 'A responsive, accessible, production-ready Todo application built with Next.js, App Router, TypeScript, and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased min-h-full selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
