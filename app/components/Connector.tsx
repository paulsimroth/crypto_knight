'use client';
import { formatEthAddress } from "@/lib/wagmi";
import { Button } from "./ui/button";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

function Connector() {

    const { connect } = useConnect();
    const { address } = useAccount();

    return (
        <Button size="lg" onClick={() => connect({ connector: injected() })} variant={address ? "outline" : "default"}>
            {address
                ? formatEthAddress(address)
                : "CONNECT WALLET"}
        </Button>

    )
};

export default Connector;