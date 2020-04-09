const Web3 = require("web3");
import * as VirtualPowerPlantABI from "./contracts/VirtualPowerPlant.json"

export default class VirtualPowerPlant{
    contractObj: any;
    contractAddress: any;
    nodeURL: any;
    web3: any;
    gasLimit = "3000000";
    value = 0;
    suppliers:any = [];
    consumers:any = [];
    constructor(contractAddress: string, nodeURL: string) {
        this.nodeURL = nodeURL;
        this.web3 = new Web3(new Web3.providers.HttpProvider(nodeURL));
        //@ts-ignore
        this.contractObj = new this.web3.eth.Contract(VirtualPowerPlantABI.abi);
        this.contractAddress = contractAddress;
        this.contractObj.options.address = contractAddress;
    }
    async getTransactionCount(address: string) {
        let count = await this.web3.eth.getTransactionCount(address);
        return count
    }
    async createSupplier(pubKey:string, privKey:string, kwhPrice:number, kwhAmount:string, sourceType:string) {
        try {
            let transactionObject = await this.contractObj.methods.createSupplier(kwhPrice, kwhAmount, sourceType).encodeABI();
            let count = await this.getTransactionCount(pubKey);
            const tx = {
                from: pubKey,
                to: this.contractAddress,
                gas: this.gasLimit,
                value: this.value,
                data: transactionObject,
                nonce: count
            };
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
            await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            //@ts-ignore
            this.suppliers.push({pubKey: pubKey, privKey: privKey})
        } catch (e) {
            return e;
        }

    }
    async createConsumer(pubKey:string, privKey:string, demand:number) {
        try {
            let transactionObject = await this.contractObj.methods.createConsumer(demand).encodeABI();
            let count = await this.web3.getTransactionCount(pubKey);
            const tx = {
                from: pubKey,
                to: this.contractAddress,
                gas: this.gasLimit,
                value: this.value,
                data: transactionObject,
                nonce: count
            };
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
            await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            this.consumers.push({pubKey: pubKey, privKey: privKey})
        } catch (e) {
            console.error(e);
        }
    }
    async placeBid(pubKey:string, privKey:string, supplierPubKey:string, price:number, duration:number) {
        try {
            let transactionObject = await this.contractObj.methods.placeBid(supplierPubKey, price, duration).encodeABI();
            let count = await this.web3.getTransactionCount(pubKey);
            const tx = {
                from: pubKey,
                to: this.contractAddress,
                gas: this.gasLimit,
                value: this.value,
                data: transactionObject,
                nonce: count
            };
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
            await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        } catch (e) {
            console.error(e);
        }
    }
    async acceptBid(pubKey:string, privKey:string, bidID:string) {
        try {
            let transactionObject = await this.contractObj.methods.acceptBid(bidID).encodeABI();
            let count = await this.web3.getTransactionCount(pubKey);
            const tx = {
                from: pubKey,
                to: this.contractAddress,
                gas: this.gasLimit,
                value: this.value,
                data: transactionObject,
                nonce: count
            };
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
            await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        } catch (e) {
            console.error(e);
        }
    }
    async denyBid(pubKey:string, privKey:string, bidID:string) {
        try {
            let transactionObject = await this.contractObj.methods.denyBid(bidID).encodeABI();
            let count = await this.web3.getTransactionCount(pubKey);
            const tx = {
                from: pubKey,
                to: this.contractAddress,
                gas: this.gasLimit,
                value: this.value,
                data: transactionObject,
                nonce: count
            };
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privKey);
            await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        } catch (e) {
            console.error(e);
        }
    }

    async getSuppliers() {
        let suppliers = await this.contractObj.methods.getSuppliers().call();
        return suppliers;
    }
    async getSupplier(address: string){
        let supplier = await this.contractObj.methods.getSupplier(address).call();
        return supplier;
    }
    async getConsumers() {
        let consumers = await this.contractObj.methods.getConsumers().call();
        return consumers;
    }
    async getBids() {
        let bids = await this.contractObj.methods.getBids().call();
        return bids;
    }

    async clearState() {
        let result = await this.contractObj.methods.clear().call()
        return result;
    }
}