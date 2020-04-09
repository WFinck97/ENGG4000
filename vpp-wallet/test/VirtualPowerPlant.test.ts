import { ethers } from 'ethers';
import * as VirtualPowerPlant from '../src//contracts/VirtualPowerPlant.json';

describe('Testing Virtual Power Plant', () => {
  it('Listing Accounts', async () => {
    let provider = new ethers.providers.JsonRpcProvider(
      'http://quorum.lemmi.be'
    );
    let accounts = await provider.listAccounts();
    expect(accounts == null).toBe(false);
  });
  it('Creating a consumer', async () => {
    let provider = new ethers.providers.JsonRpcProvider(
      'http://quorum.lemmi.be'
    );
    let signer = provider.getSigner(0);
    let unlockResult = await signer.unlock('30somers');
    expect(unlockResult == undefined).toBe(false);
    let contract = new ethers.Contract(
      '0x89972d30f728e1c0a6d8be7d9fe67e8f0dd56635',
      VirtualPowerPlant.abi,
      signer
    );
    async function createConsumer(demand: Number) {
      let result = await contract.createConsumer(demand);
      return result;
    }
    let result = await createConsumer(100);
    expect(result == null).toBe(false);
  });
});
