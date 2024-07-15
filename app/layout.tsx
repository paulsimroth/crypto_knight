import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import WagmiClientWrapper from "./components/WagmiClientWrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Crypto Knight",
    description: "Start your adventure and collect coins.",
    icons: {
        icon: "/favicon.ico?v=1",
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <WagmiClientWrapper>
                <body className=''>
                    <Navbar />
                    <main className='flex flex-col items-center justify-center bg-background h-fit'>
                        {children}
                    </main>
                </body>
            </WagmiClientWrapper>
        </html>
    )
};