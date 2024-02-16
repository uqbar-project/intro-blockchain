import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-ignition-viem'
import '@nomicfoundation/hardhat-ethers'
import 'hardhat-abi-exporter'
import 'solidity-coverage'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
}

export default config
