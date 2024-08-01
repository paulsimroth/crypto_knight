
type ChainInfo = {
    name: string;
    tokenContract: string;
    specialItemContract: string;
    marketplaceAddress: string;
}

type ChainData = {
    [chainId: number]: ChainInfo;
}

const chainData: ChainData = {
    1: {
        name: "Ethereum",
        tokenContract: "",
        specialItemContract: "",
        marketplaceAddress: ""
    },
    42161: {
        name: "Arbitrum",
        tokenContract: "",
        specialItemContract: "",
        marketplaceAddress: ""
    },
    137: {
        name: "Matic (Polygon)",
        tokenContract: "",
        specialItemContract: "",
        marketplaceAddress: ""
    },
    421614: {
        name: "Arbitrum Sepolia",
        tokenContract: "0xCa7Db3644ba596205c41374162B7DD62e05b4615",
        specialItemContract: "0x9FF9Ca3a8421723c22aA8F9930d7377CE8d83b21",
        marketplaceAddress: "0x77d97e471e804494af0F8cFfd7e8B14C56E3f827"
    },
    11155111: {
        name: "Ethereum Sepolia",
        tokenContract: "",
        specialItemContract: "",
        marketplaceAddress: ""
    },
};

export function getChainInfo(chainId: number): ChainInfo {
    const chainInfo = chainData[chainId];
    if (!chainInfo) {
        throw new Error(`Chain with ID ${chainId} not found`);
    }
    return chainInfo;
}

export async function mintAfterGame(amount: number) {
    console.log("FINISHED WITH", amount)
}

export async function getInventory() {
    console.log("GET INVENTORY")
}

export async function getMarketplaceItems() {
    console.log("GET MARKETPLACE ITEMS")
}

export async function buy10KTokens() { }

export async function buy100KTokens() { }