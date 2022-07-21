
const Web3 = require("web3");
const ethNetwork = 'https://rinkeby.infura.io/v3/66c3d7d2e3984e21972bf2c7a467b94f';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

export const verifySignature = async ({ chain, signature, signed_message }) => {


    if (['eth', 'ftm', 'matic', 'evm', 'glmr'].includes(chain)) {
        const recoveredAddress = await web3.eth.accounts.recover(signed_message, signature)
        return recoveredAddress;
    }

    // Todo : Add solana

}
