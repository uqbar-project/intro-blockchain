import { expect } from 'chai'
import hre from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { parseGwei } from 'viem'

describe('Wallet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWalletSingleAccount() {
    const lockedAmount = parseGwei('1')

    // Contracts are deployed using the first signer/account by default
    const [otherAccount] = await hre.viem.getWalletClients()

    const wallet = await hre.viem.deployContract('Wallet', [], {
      value: lockedAmount,
    })

    await wallet.write.put([otherAccount.account.address, BigInt(100)])

    return {
      wallet,
      address: otherAccount.account.address,
    }
  }

  describe('Wallet', function () {

    it('should have an initial balance > 0', async function () {
      const { wallet, address } = await loadFixture(deployWalletSingleAccount)

      expect(await wallet.read.balance([address])).to.equal(BigInt(100))
    })

    describe('withdraw', async function() {

      it('should allow to withdraw money if there is enough', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await wallet.write.withdraw([address, BigInt(25)])
        expect(await wallet.read.balance([address])).to.equal(BigInt(75))
      })
  
      it('should allow to withdraw all the money', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await wallet.write.withdraw([address, BigInt(100)])
        expect(await wallet.read.balance([address])).to.equal(BigInt(0))
      })
  
      it('should not allow to withdraw $0', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await expect(wallet.write.withdraw([address, BigInt(0)])).to.be.rejectedWith('Value must be positive')
      })
  
      it('should not allow to withdraw negative money', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await expect(wallet.write.withdraw([address, BigInt(-10)])).to.be.rejectedWith('Value must be positive')
      })
  
      it('should not allow to withdraw more money than it has', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await expect(wallet.write.withdraw([address, BigInt(101)])).to.be.rejectedWith('Not enough cash')
      })

    })

    describe('put', async function() {

      it('should allow to put money', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await wallet.write.put([address, BigInt(200)])
        expect(await wallet.read.balance([address])).to.equal(BigInt(300))
      })

      it('should not allow to put $0', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await expect(wallet.write.put([address, BigInt(0)])).to.be.rejectedWith('Value must be positive')
      })

      it('should not allow to put a negative value', async function () {
        const { wallet, address } = await loadFixture(deployWalletSingleAccount)
        await expect(wallet.write.put([address, BigInt(-10)])).to.be.rejectedWith('Value must be positive')
      })

    })

  })

})
