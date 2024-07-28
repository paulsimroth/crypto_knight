'use client';
import { useSwitchChain } from 'wagmi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

function NetworkSwitch() {
    const { chains, switchChain } = useSwitchChain();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Networks
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {chains.map((chain) => (
                    <DropdownMenuItem>
                        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                            {chain.name}
                        </button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default NetworkSwitch;