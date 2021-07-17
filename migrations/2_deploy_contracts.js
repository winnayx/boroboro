var Artwork = artifacts.require("../contracts/Artwork.sol");

module.exports = function (deployer) {
  deployer.deploy(Artwork);
};
