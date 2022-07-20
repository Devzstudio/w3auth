
export const isEmpty = (n: any) => {
    if (n == null) return true;

    return !(!!n
        ? typeof n === 'object'
            ? Array.isArray(n)
                ? !!n.length
                : !!Object.keys(n).length
            : true
        : false);
};


export function shortenAddress(address, chars = 4) {
    if (!address) {
        return null;
    }
    const parsed = (address)
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(address.length - chars)}`
}


export const isNull = (n: any) => {
    if (!n) return true;
    return false;
};

export const ucwords = (string: string): string => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    return string
};


export const updateSettings = (set: any) => {
    const data: any = [];
    Object.keys(set).map((val) => {
        data.push({ name: val, value: `${set[val]}` });
    });
    return data;
};
