import "./globals.css";
import Navbar from "./components/Navbar";
import WagmiClientWrapper from "./components/WagmiClientWrapper";
import { Metadata } from "next";
import Footer from "./components/Footer";

export const metadata: Metadata = {
    title: "Crypto Knight",
    description: "Start your adventure and collect coins.",
    authors: [{ name: `Paul Simroth`, url: `https://www.paulsimroth.at/` }],
    creator: `Paul Simroth`,
    publisher: `Paul Simroth`,
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
                <body className='h-[100vh]'>
                    <Navbar />
                    <main className='flex flex-col items-center justify-center bg-background h-full'>
                        {children}
                    </main>
                    <Footer />
                </body>
            </WagmiClientWrapper>
        </html>
    )
};