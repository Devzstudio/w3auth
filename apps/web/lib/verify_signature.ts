import nacl from 'tweetnacl'
import bs58 from 'bs58'
const { keyStores } = require("near-api-js");

import * as fcl from "@onflow/fcl";

import { signatureVerify } from '@polkadot/util-crypto';

const Web3 = require("web3");
const ethNetwork = 'https://rinkeby.infura.io/v3/66c3d7d2e3984e21972bf2c7a467b94f';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

export const verifySignature = async ({ chain, signature, signed_message, public_key = null }) => {


    if (['eth', 'bnb', 'ftm', 'matic', 'evm', 'glmr', 'movr'].includes(chain)) {
        const recoveredAddress = await web3.eth.accounts.recover(signed_message, signature)
        return recoveredAddress;
    }


    if (chain == "sol") {
        const result = nacl
            .sign
            .detached
            .verify(
                new TextEncoder().encode(signed_message),
                bs58.decode(signature),
                bs58.decode(public_key) //public key
            )

        return result;

    }


    if (chain == "dot") {
        const { isValid } = signatureVerify(signed_message, signature, public_key);
        return isValid;
    }


    if (chain == "flow") {
        const result = await fcl.AppUtils.verifyUserSignatures(
            Buffer.from(signed_message).toString('hex'),
            [{ f_type: "CompositeSignature", f_vsn: "1.0.0", addr: public_key, keyId: 0, signature: signature }]
        );

        return result;
    }


    if (chain == "near") {
        const keyStore = new keyStores.UnencryptedFileSystemKeyStore(".near-credentials");

        const keyPair = await keyStore.getKey("mainnet", public_key);
        const msg = Buffer.from(signed_message);
        const isValid = keyPair.verify(msg, signature);

        return isValid;
    }


}
