import nacl from 'tweetnacl'
import bs58 from 'bs58'

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

    //  polkadot sign and verify Refer: https://polkadot.js.org/docs/keyring/start/sign-verify/
    // flow sign and verify: Refer: https://docs.onflow.org/fcl/reference/user-signatures/

}
