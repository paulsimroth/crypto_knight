import { parseEther } from 'viem';
import { TokenAbi } from "../../contracts/abis/TokenAbi";
import { writeContract } from '@wagmi/core'
import { wagmiConfig } from "@/lib/wagmi";
import { weiToEther } from "./web3Helpers";

type ChainInfo = {
    name: string;
    tokenContract: `0x${string}`;
    specialItemContract: `0x${string}`;
    marketplaceAddress: `0x${string}`;
}

type ChainData = {
    [chainId: number]: ChainInfo;
}

const chainData: ChainData = {
    1: {
        name: "Ethereum",
        tokenContract: "0x000",
        specialItemContract: "0x000",
        marketplaceAddress: "0x000"
    },
    42161: {
        name: "Arbitrum",
        tokenContract: "0x000",
        specialItemContract: "0x000",
        marketplaceAddress: "0x000"
    },
    137: {
        name: "Matic (Polygon)",
        tokenContract: "0x000",
        specialItemContract: "0x000",
        marketplaceAddress: "0x000"
    },
    421614: {
        name: "Arbitrum Sepolia",
        tokenContract: "0xCa7Db3644ba596205c41374162B7DD62e05b4615",
        specialItemContract: "0x9FF9Ca3a8421723c22aA8F9930d7377CE8d83b21",
        marketplaceAddress: "0x77d97e471e804494af0F8cFfd7e8B14C56E3f827"
    },
    11155111: {
        name: "Ethereum Sepolia",
        tokenContract: "0x000",
        specialItemContract: "0x000",
        marketplaceAddress: "0x000"
    },
};

export function getChainInfo(chainId: number): ChainInfo {
    const chainInfo = chainData[chainId];
    if (!chainInfo) {
        throw new Error(`Chain with ID ${chainId} not found`);
    }
    return chainInfo;
}

export async function getInventory() {
    console.log("GET INVENTORY")
}

export async function getMarketplaceItems() {
    console.log("GET MARKETPLACE ITEMS")
}

export async function buy10KTokens() { }

export async function buy100KTokens() { }

export let currentScore: any;
export async function gameScore(score: number) {
    currentScore = score;
};

export async function mintScore(score: number, address: `0x${string}`, chainId: number) {

    const scoreInEther = weiToEther(score);
    console.log(scoreInEther)

    try {
        const tx = await writeContract(wagmiConfig, {
            address: getChainInfo(chainId).tokenContract,
            abi: TokenAbi,
            functionName: 'mint',
            args: [address, parseEther(score.toString())],
        });

        console.log("Transaction sent:", tx);
        return tx;
    } catch (error) {
        console.error("Error minting tokens:", error);
        throw error;
    }
}