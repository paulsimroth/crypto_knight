import React from "react"
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className=''>
                <main className=''>
                    {children}
                </main>
            </body>
        </html>
    )
};