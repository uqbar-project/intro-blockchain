const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')

let walletInstance

contract('Wallet', (accounts) => {
    beforeEach(async() => {
        walletInstance = await Wallet.deployed()
        await walletInstance.put.call(accounts[0], 100)
        const balance = await walletInstance.wallet[accounts[0]]
        assert.isTrue(balance === 100)
        done()
    })
})