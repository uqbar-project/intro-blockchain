import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('Wallet', (moduleBuilder) => {
  const wallet = moduleBuilder.contract('Wallet', [])

  // moduleBuilder.call(wallet, 'put', [falta el address, 100])

  return { wallet }
})