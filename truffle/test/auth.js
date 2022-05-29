const Auth = artifacts.require('./Auth.sol')
const assert = require('assert')
const { testRejection } = require('./test-utils')

contract('Auth', async (accounts) => {
  const user = {
    name: 'jperalta',
    password: 'cool',
    wallet_address: accounts[1],
  }
  beforeEach('initialized', async () => {
    authSmartContract = await Auth.new()
  })
  describe('register', () => {
    it('should work once', async () => {
      await authSmartContract.register(user)
  
      const userExists = await authSmartContract.exists(user.name)
      assert.equal(userExists, true)
    })
    it('should fail while trying to register the second time', async () => {
      await authSmartContract.register(user)
  
      testRejection(async () => { await authSmartContract.register(user) }, 'User already registered')
    })
  })
  describe('login', () => {
    it('should work if correct credentials sent', async () => {
      await authSmartContract.register(user)
  
      const loggedIn = await authSmartContract.login(user.name, user.password)
      assert.equal(loggedIn, true)
    })
    it('should fail if wrong name sent', async () => {
      await authSmartContract.register(user)
  
      const loggedIn = await authSmartContract.login('asantiago', user.password)
      assert.equal(loggedIn, false)
    })
    it('should fail if wrong password sent', async () => {
      await authSmartContract.register(user)
  
      const loggedIn = await authSmartContract.login(user.name, 'mamaMagglione')
      assert.equal(loggedIn, false)
    })
  })
  describe('get_address', () => {
    it('should get the right address', async () => {
      await authSmartContract.register(user)
  
      const address = await authSmartContract.get_address(user.name)
      assert.equal(address, user.wallet_address)
    })
  })

})

