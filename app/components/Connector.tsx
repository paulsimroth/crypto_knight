'use client';
import { Button } from "./ui/button";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

function Connector() {

    const { connect } = useConnect();
    const { address } = useAccount();

    return (
        <Button size="lg" onClick={() => connect({ connector: injected() })} variant={address ? "outline" : "ghost"}>
            {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "CONNECT WALLET"}
        </Button>

    )
}

export default Connector