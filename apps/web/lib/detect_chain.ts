import { ethers } from "ethers";
import { PublicKey } from '@solana/web3.js'
const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const isValidSolanaAddress = (address: string) => {
    try {
        let pubkey = new PublicKey(address)
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
}

const isValidAddressPolkadotAddress = (address: string) => {
    try {
        encodeAddress(
            isHex(address)
                ? hexToU8a(address)
                : decodeAddress(address)
        );

        return true;
    } catch (error) {
        return false;
    }
};


export const detectChain = (address) => {
    let chain;

    if (ethers.utils.isAddress(address)) {
        chain = "eth"
    }

    if (isValidSolanaAddress(address)) {
        chain = "sol"
    }

    if (isValidAddressPolkadotAddress(address)) {
        chain = "dot"
    }

    // Todo: Flow blockchain address validation

    return chain;

}
