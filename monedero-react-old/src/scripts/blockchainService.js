import Web3 from 'web3'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const walletABI = require('../services/Wallet.json')
const authABI = require('../services/Auth.json')

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

export const addresses = await web3.eth.getAccounts()

// Cuentas a generar
export const cuentas = [
  {
      address: addresses[0],
      balance: 0,
      username: 'dodain'
  },
  {
      address: addresses[1],
      balance: 0,
      username: 'juan'
  },
  {
      address: addresses[2],
      balance: 0,
      username: 'dini'
  },
]

// Address que sale de la solapa Contracts en Ganache, correspondiente al Smart Contract Wallet
// (con el que se deployó)
web3.eth.defaultAccount = web3.eth.accounts[0]
// Bug de web3 no se puede obtener
// web3.eth.handleRevert = true

// Importante, cuando deployemos hay que registrar el contract address que nos da la truffle console
// Replacing 'Wallet'
// ------------------
// > transaction hash:    0x32a69f7151fc988f3dbeaf9132dc5492704dac7889fc8f03dfdc27585ddbc30d
// > Blocks: 0            Seconds: 0
// > contract address:    0x84F39C6a769ffBFBb8F88f03c989f0584c71F718
export const walletContract = new web3
  .eth
  .Contract(walletABI, '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512')

export const authContract = new web3
  .eth
  .Contract(authABI, '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0')
