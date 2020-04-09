import { ethers } from 'ethers';
import * as VirtualPowerPlant from './contracts/VirtualPowerPlant.json';

export class baseVPP {
  private _contractAddress: string;
  private _signer: ethers.Signer;
  private _contract: ethers.Contract;

  constructor(contractAddress: string, signer: ethers.Signer) {
    //Assumes that an unlocked signer is passed
    this._contractAddress = contractAddress;
    this._signer = signer;
    this._contract = new ethers.Contract(
      this.contractAddress,
      VirtualPowerPlant.abi,
      this.signer
    );
  }

  get contractAddress(): string {
    return this._contractAddress;
  }

  get signer(): ethers.Signer {
    return this._signer;
  }

  set contractAddress(address: string) {
    this._contractAddress = address;
  }

  set signer(signer: ethers.Signer) {
    this._signer = signer;
  }

  get contract(): ethers.Contract {
    return this._contract;
  }

  async getConsumers() {
    return await this.contract.getConsumers();
  }

  async clearVPP() {
    //the fact that anything extending or instantiating this class can clear
    //the contracts state is bad... but given time constraints it can help with testing
    return this.contract.clear();
  }
}

export class Consumer extends baseVPP {
  constructor(contractAddress: string, signer: ethers.Signer) {
    super(contractAddress, signer);
  }

  async exists(): Promise<boolean> {
    let address = await this.signer.getAddress();
    let consumers: string[] = await this.getConsumers();
    return consumers.includes(address);
  }

  async instantiate(demand: Number) {
    let exists = await this.exists();
    if (exists) {
      console.log('Consumer with address already exists');
      return;
    } else {
      return this.contract.createConsumer(demand);
    }
  }

  async state() {
    let address = await this.signer.getAddress();
    return this.contract.consumerMapping(address);
  }
}
