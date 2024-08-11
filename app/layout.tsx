import "./globals.css";
import Navbar from "./components/Navbar";
import WagmiClientWrapper from "./components/WagmiClientWrapper";
import { Metadata } from "next";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ui/theme-provider";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";
import { Toaster } from "./components/ui/toaster";

export const metadata: Metadata = {
    title: "Crypto Knight | A Web3 Game",
    description: "Start your adventure and collect coins. Trade them for epic items and make your knight stronger",
    authors: [{ name: `Paul Simroth`, url: `https://www.paulsimroth.at/` }],
    creator: `Paul Simroth`,
    publisher: `Paul Simroth`,
    openGraph: {
        title: "Crypto Knight | A Web3 Game",
        description: `Start your adventure and collect coins. Trade them for epic items and make your knight stronger`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        siteName: "Crypto Knight | A Web3 Game",
        type: "website",
        locale: "en"
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        noimageindex: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        }
    },
    verification: {
        google: "",
    },
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
                <body className='h-[100vh] flex flex-col items-center justify-between'>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-between">
                            <Navbar />
                            <main className='flex flex-col items-center justify-center bg-background h-fit'>
                                {children}
                            </main>
                            <Footer />
                        </div>
                        <Toaster />
                        <CookieBanner />
                    </ThemeProvider>
                    <GoogleAnalytics gaId={process!.env!.NEXT_PUBLIC_GA_ID!} />
                </body>
            </WagmiClientWrapper>
        </html>
    )
};