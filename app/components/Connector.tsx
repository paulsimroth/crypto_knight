'use client';
import { formatEthAddress } from "@/lib/wagmi";
import { Button } from "./ui/button";
import { useAccount, useConnect } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Wallet } from "lucide-react";

function Connector() {

    const { connect } = useConnect();
    const { address } = useAccount();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="lg" variant={address ? "outline" : "default"}>
                    {address ? (
                        formatEthAddress(address)
                    ) : (
                        "Connect Wallet"
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Connect your Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button onClick={() => connect({
                        connector: metaMask()
                    })} variant={"ghost"} className="flex items-center justify-start w-full gap-3">
                        <Image
                            src="/metamask_logo.svg"
                            alt="MetaMask"
                            width={35}
                            height={35}
                        />
                        <span>MetaMask</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button onClick={() => connect({
                        connector: injected()
                    })} variant={"ghost"} className="flex items-center justify-start w-full gap-3">
                        <Wallet />
                        <span>Other</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default Connector;