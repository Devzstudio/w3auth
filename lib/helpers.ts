
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

export const getTokenContractDetails = (set: any) => {
    const data: any = {};
    set.map((val) => {
        data[val.contract_address] = val.value
    });
    return data;
};

export const getAppCookies = (req) => {
    try {
        const rawCookies = req.headers.cookie.split('; ');
        const parsedCookies = {};
        rawCookies.forEach(rawCookie => {
            const parsedCookie = rawCookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
        return parsedCookies;
    }
    catch {
        return false;
    }
};

export const broofa = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export const urlParams = (routerParams) => {
    let urlQuery = '';

    Object.keys(routerParams).forEach((key) => {
        urlQuery += `${key}=${routerParams[key]}&`;
    });

    return urlQuery;
}

export const urlParamsWithoutCondition = (values) => {
    let urlQuery = '';

    Object.keys(values).forEach((key) => {
        if (values[key]) {
            if (key.includes('_condition')) {
                const conditionsSplit = key.split('_condition');
                if (urlQuery.includes(conditionsSplit[0])) {
                    urlQuery += `${key}=${values[key]}&`;
                }
            } else {
                if (values[key] && values[key] != "") {
                    if (typeof values[key] == "object") {
                        urlQuery += `${key}=${values[key].join(",")}&`;
                    }
                    else {
                        urlQuery += `${key}=${values[key]}&`;
                    }
                }
            }
        }
    });

    return urlQuery;
}


export const whereCondition = ({ context, fieldMapping = {}, relationCondition = {} }) => {
    let where;

    Object.keys(context.query).forEach(query => {
        if (!['page'].includes(query) && !query.includes('_condition')) {

            if (relationCondition[query]) {
                where = {
                    ...where,
                    ...relationCondition[query]
                };
            }
            else {

                let queryCondition = context.query[`${query}_condition`] ?? 'equals'

                where = {
                    ...where,
                    [fieldMapping[query] ?? query]: {
                        [queryCondition]: ['created_at', 'last_login', 'updated_at'].includes(query) ? new Date(context.query[query]) : context.query[query],
                    },
                };
            }
        }
    }
    )

    return where;
}


export const walletExplore = (chain, address) => {
    if (chain == "eth") return `https://debank.com/profile/${address}`
    if (chain == "sol") return `https://solscan.io/account/${address}`
    if (chain == "dot") return `https://polkadot.subscan.io/account/${address}`
    if (chain == "flow") return `https://flowscan.org/account/${address}`
    if (chain == "near") return `https://explorer.near.org/accounts/${address}`
    return null
}
