import Web3 from 'web3'

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Se obtiene de ingresar a `truffle console` y pedirle `JSON.stringify(Wallet.abi)`
const walletABI = [{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wallet","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"int256","name":"howMuch","type":"int256"}],"name":"put","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"int256","name":"howMuch","type":"int256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balance","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"}]
const authABI = [{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"users","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"internalType":"struct Auth.User","name":"user","type":"tuple"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"get_address","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
// Address que sale de la solapa Contracts en Ganache, correspondiente al Smart Contract Wallet
// (con el que se deployó)
web3.eth.defaultAccount = web3.eth.accounts[0]
// Bug de web3 no se puede obtener
// web3.eth.handleRevert = true

export const smartContractAccount = '0x84F39C6a769ffBFBb8F88f03c989f0584c71F718'

// Importante, cuando deployemos hay que registrar el contract address que nos da la truffle console
// Replacing 'Wallet'
// ------------------
// > transaction hash:    0x32a69f7151fc988f3dbeaf9132dc5492704dac7889fc8f03dfdc27585ddbc30d
// > Blocks: 0            Seconds: 0
// > contract address:    0x84F39C6a769ffBFBb8F88f03c989f0584c71F718
export const walletContract = new web3
  .eth
  .Contract(walletABI, '0xf4C0837214122137BC675a5b719D6c18582a1580')

export const authContract = new web3
  .eth
  .Contract(authABI, '0x5B50e99C6519F0563c752ebeF473a49F24101532')

export function handleRPCError(error) {
  const parsedError = JSON.stringify(error.message)
  if (parsedError.includes('execution reverted: ')) {
    const rgx = /(?<=execution reverted: )(.*)(?=\\n{)/g
    const rgxResult = rgx.exec(parsedError)
    return Array.isArray(rgxResult) ? rgxResult[0] : rgxResult
  }
  return 'Unknown error'
}