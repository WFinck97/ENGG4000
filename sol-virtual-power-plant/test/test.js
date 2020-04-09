const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545/");
const web3 = new Web3(provider);
//import fs from "fs";

var VPPABI = require('../build/contracts/VirtualPowerPlant2.json');

web3.eth.net.isListening()
   .then(() => console.log('web3 is connected'))
   .catch(e => console.log('Wow. Something went wrong'));


const abi = VPPABI.abi;
const contract_Address="0xa1CE4B7a129c58Cd4400063728F09E28d071fdb3";
const contract = new web3.eth.Contract(abi, contract_Address);
//contract.methods.getGreeting().call().then(console.log);