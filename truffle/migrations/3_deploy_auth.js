let Auth = artifacts.require("./Auth.sol")

module.exports = function (deployer) {
   deployer.deploy(Auth)
}
