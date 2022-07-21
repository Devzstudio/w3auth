
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


export const getSettings = (set: any) => {
    const data: any = {};
    set.map((val) => {
        if (val.value == "true" || val.value == "false")
            data[val.name] = val.value == "true" ? true : false
        else
            data[val.name] = val.value
    });
    return data;
};
