const Web3 = require("web3");
let web3
//@ts-ignore
import VirtualPowerPlant from "../producer";
const contractAddress = "0xf64C46A79daFbd6d5e1600EfFBF58A29FF7692C1";
const nodeURL = "http://127.0.0.1:7545";
let supplierAddress = "0x0a020E5868f7CBF872dA398A67f1F63A256F66CD";
let supplierPrivKey = "dadaea61d84ff3e6271372b746f89917890bdff81761e24757a386cf07922011";
let producerAddress = "dc5a406bdadcaf1d43e9160af5fa9c37e98af85ff4404c736f3ec89da297c5f6";
let gasLimit = "3000000";
let vpp: any;

describe("Testing Virtual Power Plant", () => {
   beforeAll(() => {
       //@ts-ignore
       vpp = new VirtualPowerPlant(contractAddress, nodeURL);
       expect(vpp==undefined).toBe(false)
   });
   test("Testing create supplier", async () => {
       let count = await vpp.getTransactionCount(supplierAddress);
       expect(count==undefined).toBe(false);
   });
   test("Creating Supplier", async () => {

   let clearing = await vpp.clearState();
   let result = await vpp.createSupplier(supplierAddress, supplierPrivKey, 1, 100, "solar");
   let suppliers = await vpp.getSuppliers();
   let supplier = await vpp.getSupplier(suppliers[0]);
   expect(supplier==undefined).toBe(false);
   expect(supplier[1]=="100").toBe(true); //kwhPrice
   expect(supplier[2]=="1").toBe(true); //kwhAmount
   expect(supplier[3]=="solar").toBe(true);
   })

})