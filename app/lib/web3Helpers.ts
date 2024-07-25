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
};

export function weiToGwei(wei: bigint | undefined): string {
    if (!wei) return "0";
    const gwei = Math.round(Number(wei) / 1e9).toString();
    return gwei.replace(/,/g, '');
};

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
};

export function stringToInt(input: string) {
    const res = parseInt(input);
    return res;
};