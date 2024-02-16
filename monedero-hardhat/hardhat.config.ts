import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-ignition-viem'
import 'hardhat-abi-exporter'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
}

export default config
