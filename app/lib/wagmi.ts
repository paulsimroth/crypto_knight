import { http, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
    chains: [mainnet, polygon, arbitrum],
    connectors: [
        injected(),
        metaMask(),
        safe(),
    ],
    transports: {
        [mainnet.id]: http(`https://mainnet.infura.io/v3/b82bb95def8142c98825fb3f66629dc0`),
        [polygon.id]: http("https://polygon-mainnet.infura.io/v3/b82bb95def8142c98825fb3f66629dc0"),
        [arbitrum.id]: http("https://arbitrum-mainnet.infura.io/v3/b82bb95def8142c98825fb3f66629dc0"),
    },
});

declare module 'wagmi' {
    interface Register {
        wagmiConfig: typeof wagmiConfig
    }
}


/**
 * Converts a gas price from wei (bigint) to gwei (number).
 * 
 * @param gasPriceWei - The gas price in wei as a bigint or undefined.
 * @returns The gas price in gwei as a number or undefined if input is undefined.
 */
export function convertBigIntGasPriceToGwei(gasPriceWei: bigint | undefined): number | undefined {
    // Check if the input is undefined
    if (gasPriceWei === undefined) {
        return undefined;
    }

    // Convert the bigint to a string first to handle large values safely
    const gasPriceStr = gasPriceWei.toString();

    // Parse the string to a number
    const gasPriceNumber = Number(gasPriceStr);

    if (Number.isNaN(gasPriceNumber)) {
        throw new Error("Failed to convert gas price to number due to precision loss.");
    }

    const gasPriceGwei = gasPriceNumber / 10 ** 9;

    return gasPriceGwei;
};

export function weiToEther(wei: BigInt | number | undefined): number {
    if (!wei) {
        return 0;
    }
    /**
     * Convert Wei to Ether.
     * @param wei The amount of Wei to convert.
     * @returns The equivalent amount in Ether.
     */
    const ether: number = Number(wei.toString()) / 10 ** 18;
    return ether;
}

export function formatEthAddress(address: string | undefined) {
    if (address) {
        const res = address.slice(0, 6) + '...' + address.slice(38, 42);
        return res;
    } else {
        return;
    }
};

export function formatUnixTimestamp(timestamp: string): string {
    // Convert timestamp string to number
    const unixTimestamp = parseInt(timestamp, 10);

    // Create a new Date object using the timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Construct the human-readable date string
    const readableDate = date.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ', ' + date.toLocaleTimeString('en');

    return readableDate;
};

export function formatBigIntTimestamp(timestamp: bigint | undefined): string {

    // Check if timestamp is undefined
    if (timestamp === undefined) {
        return '0';
    }
    // Convert timestamp bigint to number
    const unixTimestamp = Number(timestamp);

    // Create a new Date object using the timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Month names array
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()]; // getUTCMonth() returns month from 0 to 11
    const day = ('0' + date.getUTCDate()).slice(-2);
    const year = date.getUTCFullYear();

    const hours = date.getUTCHours();
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    const seconds = ('0' + date.getUTCSeconds()).slice(-2);

    // Format hours in 12-hour format
    const hours12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Construct the formatted date string
    const formattedDate = `${month}-${day}-${year} ${('0' + hours12).slice(-2)}:${minutes}:${seconds} ${ampm}+UTC`;

    return formattedDate;
}


export function stringToInt(input: string) {
    const res = parseInt(input);
    return res;
};

export function calculateGasUsage(
    gasUsed: bigint | undefined,
    gasLimit: bigint | undefined,
    baseFeePerGas: bigint | null | undefined
): { gasUsed: number, gasPercentage: string, gasBurned: number } {
    // Check for undefined values
    if (gasUsed === undefined || gasLimit === undefined || baseFeePerGas === undefined || baseFeePerGas === null) {
        return { gasUsed: 0, gasPercentage: "0.00", gasBurned: 0 };
    }

    // Convert gasUsed, gasLimit, and baseFeePerGas to numbers for calculations
    const gasUsedNum = Number(gasUsed);
    const gasLimitNum = Number(gasLimit);
    const baseFeePerGasNum = Number(baseFeePerGas);

    // Handle case where gasLimit is zero to avoid division by zero
    if (gasLimitNum === 0) {
        throw new Error("gasLimit cannot be zero");
    }

    // Calculate the percentage of gas used and format to 2 decimal places
    const gasPercentage = ((gasUsedNum / gasLimitNum) * 100).toFixed(2);

    // Calculate the gas burned
    const gasBurned = Number(gasUsed * baseFeePerGas);

    return {
        gasUsed: gasUsedNum,
        gasPercentage: gasPercentage,
        gasBurned: gasBurned
    };
}

const weiToGwei = (wei: bigint | undefined): string => {
    if (!wei) return "0";
    const gwei = Math.round(Number(wei) / 1e9).toString();
    return gwei.replace(/,/g, '');
};

interface GasPrices {
    baseFee: string;
    slow: string;
    medium: string;
    fast: string;
}

// Compute gas prices
export function calculateGasPrices(gasPrice: any, estimateGas: any, block: any): GasPrices {
    // Helper function to safely parse BigInt values, returning undefined if not available
    const safeParseBigInt = (value: any): bigint | undefined => {
        try {
            return value !== undefined && value !== null ? BigInt(value) : undefined;
        } catch (error) {
            console.error('Error parsing BigInt:', value, error);
            return undefined;
        }
    };

    const baseFeePerGas = safeParseBigInt(block?.baseFeePerGas);
    const currentGasPrice = safeParseBigInt(gasPrice?.gasPrice);
    const maxPriorityFeePerGas = safeParseBigInt(estimateGas?.maxPriorityFeePerGas) ?? BigInt(0);

    let slowGasPrice: bigint, mediumGasPrice: bigint, fastGasPrice: bigint;
    const increment: bigint = BigInt(1000000000); // 1 gwei increment

    if (baseFeePerGas !== undefined) {
        slowGasPrice = baseFeePerGas + maxPriorityFeePerGas;
        mediumGasPrice = slowGasPrice + increment; // Slightly higher than slow
        fastGasPrice = mediumGasPrice + increment; // Slightly higher than medium
    } else if (currentGasPrice !== undefined) {
        slowGasPrice = currentGasPrice;
        mediumGasPrice = currentGasPrice + increment; // Slightly higher than slow
        fastGasPrice = mediumGasPrice + increment; // Slightly higher than medium
    } else {
        // If no data is available, set everything to 0
        slowGasPrice = mediumGasPrice = fastGasPrice = BigInt(0);
    }

    // Convert fees from wei to gwei
    const baseFee = weiToGwei(baseFeePerGas);
    const slow = weiToGwei(slowGasPrice);
    const medium = weiToGwei(mediumGasPrice);
    const fast = weiToGwei(fastGasPrice);

    return {
        baseFee,
        slow,
        medium,
        fast
    };
}