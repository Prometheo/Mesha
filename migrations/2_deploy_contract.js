const MeshaToken = artifacts.require("MeshaToken");

module.exports = async function(deployer) {
  var beneficiaryAddress = "0xB4bE310666D2f909789Fb1a2FD09a9bEB0Edd99D";
  await deployer.deploy(MeshaToken, beneficiaryAddress);
};
