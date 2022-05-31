import { billeteraService } from './billeteraService'
// import { cuentas } from './cuentas'
import { authContract } from './web3Wrapper'

class UsuarioService {
  constructor() {
    this.init()
  }

  async login(usuario, password) {
    // const account = cuentas.find((acc) => acc.username === usuario)
    // if (!account) {
    //   throw new Error('El usuario no existe')
    // }
    const loggedIn = await authContract.methods.login(usuario, password).call()
    console.info('logged in', loggedIn)
    if (!loggedIn) {
      throw new Error('Las credenciales no son válidas')
    }

    const address = await authContract.methods.get_address(usuario).call()
    console.info('address', address)

    this.usuario = usuario
    // this.address = account.address
    this.address = address
    this.saldo = await billeteraService.getSaldo()
  }

  init() {
    this.usuario = ''
    this.address = ''
    this.saldo = 0
  }

}

export const usuarioService = new UsuarioService()

