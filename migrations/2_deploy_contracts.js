var SimpleStorage = artifacts.require("./SimpleStorage.sol");
//var CanvasProperties = artifacts.require("./CanvasProperties.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
//  deployer.deploy(CanvasProperties);
};
