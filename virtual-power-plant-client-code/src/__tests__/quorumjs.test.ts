const Web3 = require("web3");
let web3: any;
import * as SimpleStorage from "../contracts/SimpleStorage.json"
const transcationUpdateHash = "0x3CE418925ADD56Ebaf2E30849231a89Cb9ce2d917Ec35225f3e539FB4C655C00";
const contractAddress = "0x24bB3D581596f35cb17dCb2D7a90BfED72E79D07"
let fromAddress: string = "0x0c85a76A898326403Aef536caF3EB1722113e941";
let fromPKey: string = "dc5a406bdadcaf1d43e9160af5fa9c37e98af85ff4404c736f3ec89da297c5f6";
let gasLimit: string = "3000000";


describe("Testing Quorum Web3 api", () => {
    beforeAll(async () => {
        web3 = new Web3(
            new Web3.providers.HttpProvider("http://10.50.0.2:22002/")
        );
        // const accounts = await web3.eth.getAccounts();
        // defaultAccount = accounts[0];
    });
    test("Getting transaction count", async () => {
        let count = await web3.eth.getTransactionCount(fromAddress);
        expect(count == undefined).toBe(false);
    })
    test("Testing Quorum.js get Accounts", async () => {

        const accounts = await web3.eth.getAccounts();
        let defaultAccount = accounts[0];
        expect(defaultAccount == undefined).toBe(false);
    });
    test("Testing get transaction receipt", async () => {
        let receipt = await web3.eth.getTransactionReceipt(transcationUpdateHash);
        expect(receipt == null || receipt == undefined).toBe(false);
    });
    test("Reading smart contract state", async () => {
        //@ts-ignore
        let contract = new web3.eth.Contract(SimpleStorage.abi);
        contract.options.address = contractAddress;
        let result = await contract.methods.get().call();
        expect(result==null).toBe(false);
    })
    test("Testing sending transaction to contract", async () => {
        try {
            //@ts-ignore
            let contract = new web3.eth.Contract(SimpleStorage.abi);
            let transactionObject = await contract.methods.set(1).encodeABI();
            let count = await web3.eth.getTransactionCount(fromAddress);
            const tx = {
                from: fromAddress,
                to: contractAddress,
                gas: gasLimit,
                value: 0,
                data: transactionObject,
                nonce: count
            }
            const signedTx = await web3.eth.accounts.signTransaction(tx, fromPKey);
            let sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            let receipt = await web3.eth.getTransactionReceipt(sentTx.transactionHash);
            expect(contract == undefined).toBe(false);
        } catch (e) {
            expect(e).toBe(false);
        }
    })
})
