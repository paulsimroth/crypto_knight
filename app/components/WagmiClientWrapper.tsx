'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../lib/wagmi";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

function WagmiClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default WagmiClientWrapper;