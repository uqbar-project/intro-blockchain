import hre from 'hardhat'

async function main() {
  await Promise.all(['Auth', 'Wallet'].map(contract => hre.viem.deployContract(contract)))
  console.log('Auth & Wallet deployed')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
