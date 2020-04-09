const Migrations = artifacts.require("Migrations");
const VPP = artifacts.require("VirtualPowerPlant");
const VirtualPowerPlant2 = artifacts.require("VirtualPowerPlant2");
module.exports = function(deployer) {
  //deployer.deploy(VPP);
  deployer.deploy(Migrations);
  deployer.deploy(VirtualPowerPlant2);
};
