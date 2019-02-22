const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')

let walletSmartContract

contract('A Wallet with an initial balance of 100', async (accounts) => {
    const theAccount = accounts[1]
    beforeEach('initialized', async () => {
        walletSmartContract = await Wallet.new()  // vs. deployed() que devuelve un singleton
        await walletSmartContract.put(theAccount, 100)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(100, balance)
    })
    it('should allow to withdraw money if there is enough', async () => {
        await walletSmartContract.withdraw(theAccount, 20)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 80)
    })
    it('should allow to withdraw all the money', async () => {
        await walletSmartContract.withdraw(theAccount, 100)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 0)
    })
    it('should not allow to withdraw $ 0', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, 0) }, 'Value must be positive')
    })
    it('should not allow to withdraw a negative value', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, -10) }, 'Value must be positive')
    })
    it('should not allow to withdraw more money than it has', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, 120) }, 'Not enough cash')
    })
    it('should allow to put money', async () => {
        await walletSmartContract.put(theAccount, 200)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 300)
    })
    it('should not allow to put $ 0', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, 0) }, 'Value must be positive')
    })
    it('should not allow to put a negative value', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, -10) }, 'Value must be positive')
    })
})

async function testRejection(callback, errorMessage) {
    try {
        await callback()
        assert.fail('Should have failed')
    } catch (e) {
        assert.equal(e.reason, errorMessage)
    }
}
    


