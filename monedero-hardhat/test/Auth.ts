import { expect } from 'chai'
import hre from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { parseGwei } from 'viem'

describe('Auth', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAuthWithOneUser() {
    const lockedAmount = parseGwei('1')

    // Contracts are deployed using the first signer/account by default
    const [userAccount] = await hre.viem.getWalletClients()

    const auth = await hre.viem.deployContract('Auth', [], {
      value: lockedAmount,
    })

    const user = {
      name: 'jperalta',
      password: 'cool',
      wallet_address: userAccount.account.address,
      existing: false,
    }

    await auth.write.register([user])

    return {
      auth,
      user,
    }
  }

  describe('register', function () {

    it('should create a single user', async function () {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)

      expect(await auth.read.exists([user.name])).to.be.true
    })

    it('should fail while trying to register the second time', async () => {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)
      await expect(auth.write.register([user])).to.be.rejectedWith('User already registered')
    })


  })

  describe('login', function () {

    it('should work if correct credentials are sent', async function () {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)

      expect(await auth.read.login([user.name, user.password])).to.be.true
    })

    it('should fail if wrong user is sent', async () => {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)
      expect(await auth.read.login(['invalid_' + user.name, user.password])).to.be.false
    })

    it('should fail if wrong password is sent', async () => {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)
      expect(await auth.read.login([user.name, 'invalid_' + user.password])).to.be.false
    })

  })

  describe('get_address', function () {

    it('should get the right address', async function () {
      const { auth, user } = await loadFixture(deployAuthWithOneUser)

      const address = await auth.read.get_address([user.name])
      expect(address.toLowerCase()).to.equal(user.wallet_address.toLowerCase())
    })

  })

})
