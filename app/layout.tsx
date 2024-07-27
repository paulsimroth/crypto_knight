import "./globals.css";
import Navbar from "./components/Navbar";
import WagmiClientWrapper from "./components/WagmiClientWrapper";
import { Metadata } from "next";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ui/theme-provider";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
    title: "Crypto Knight | A Web3 Game",
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
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className='flex flex-col items-center justify-center bg-background h-fit'>
                            {children}
                        </main>
                        <Footer />
                        <CookieBanner />
                    </ThemeProvider>
                    <GoogleAnalytics gaId={process!.env!.NEXT_PUBLIC_GA_ID!} />
                </body>
            </WagmiClientWrapper>
        </html>
    )
};