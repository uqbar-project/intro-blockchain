import Web3 from 'web3'
import { cuentas } from './cuentas'

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Se obtiene de ingresar a `truffle console` y pedirle `JSON.stringify(Wallet.abi)`
const walletABI = [{'constant':true,'inputs':[{'internalType':'address','name':'','type':'address'}],'name':'wallet','outputs':[{'internalType':'int256','name':'','type':'int256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'int256','name':'howMuch','type':'int256'}],'name':'put','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'int256','name':'howMuch','type':'int256'}],'name':'withdraw','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'balance','outputs':[{'internalType':'int256','name':'','type':'int256'}],'payable':false,'stateMutability':'view','type':'function'}]

// Address que sale de la solapa Contracts en Ganache, correspondiente al Smart Contract Wallet
// (con el que se deployó)
const walletAddress = '0x17B045f1CB1BA5C01acc019BbFfFb4171CC1246E'
web3.eth.defaultAccount = web3.eth.accounts[0]

const walletContract = new web3
    .eth
    .Contract(walletABI, walletAddress)

class UsuarioService {
  constructor() {
    this.init()
  }

  async validar(usuario, password) {
    const account = cuentas.find((acc) => acc.username === usuario)
    if (!account) {
      throw new Error('El usuario no existe')
    }
    this.usuario = usuario
    this.address = account.address
    this.saldo = await billeteraService.getSaldo()
  }

  init() {
    this.usuario = ''
    this.address = ''
    this.saldo = 0
  }

}

class BilleteraService {
  async poner(monto) {
    await walletContract.methods
      .put(usuarioService.address, monto)
      .send({ from: usuarioService.address })
    const balance = this.getSaldo()
    return balance
  }

  async sacar(monto) {
    await walletContract.methods
      .withdraw(usuarioService.address, monto)
      .send({ from: usuarioService.address })
    const balance = await this.getSaldo()
    return balance
  }

  async getSaldo() {
    return walletContract.methods.balance(usuarioService.address).call()
  }

}

export const usuarioService = new UsuarioService()
export const billeteraService = new BilleteraService()

