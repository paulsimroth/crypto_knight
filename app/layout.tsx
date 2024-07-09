import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className=''>
                <Navbar />
                <main className='flex flex-col items-center justify-center bg-background'>
                    {children}
                </main>
            </body>
        </html>
    )
};