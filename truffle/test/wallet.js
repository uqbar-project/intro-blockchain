const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')

let walletSmartContract

contract('A Wallet', async (accounts) => {
    const theAccount = accounts[1]
    beforeEach('with an initial balance of 100', async () => {
        walletSmartContract = await Wallet.deployed()
        await walletSmartContract.put(theAccount, 100)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(100, balance)
    })
    it('should allow to withdraw money if there is enough', async () => {
        await walletSmartContract.withdraw(theAccount, 20)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 80)
    })
})