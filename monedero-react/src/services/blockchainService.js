import Web3 from 'web3'

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

import walletABI from './Wallet.json' 
import authABI from './Auth.json'
import { crearUsuarios } from './crearUsuarios'

web3.eth.defaultAccount = web3.eth.accounts[0]

// Importante, cuando deployemos hay que registrar el contract address que nos de la consola de hardhat
//
// Por ejemplo:
//
// eth_sendTransaction
//   Contract deployment: Wallet
//   Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
//   Transaction:         0xe9422757135956f4c9052db48e0e07253fcf247f6cea2e350fad21e70727c2fc
//   From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//   Value:               0 ETH
//   Gas used:            399536 of 399536
//   Block #2:            0x08ab3ac6cc3937bf415af52340f821f78fbf840d4346d334b4fa03b4ab3caaff
//
// nos quedamos con el contract address
export const walletContract = new web3
  .eth
  .Contract(walletABI, '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512')

export const authContract = new web3
  .eth
  .Contract(authABI, '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0')

web3.eth.getAccounts().then((addresses) => {
  crearUsuarios(addresses, authContract)
})

