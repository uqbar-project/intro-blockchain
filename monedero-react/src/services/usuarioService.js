import { billeteraService } from './billeteraService'
import { authContract } from './blockchainService'

class UsuarioService {
  constructor() {
    this.init()
  }

  async login(usuario, password) {
    const loggedIn = await authContract.methods.login(usuario, password).call()
    if (!loggedIn) {
      throw new Error('Las credenciales no son válidas')
    }

    const address = await authContract.methods.get_address(usuario).call()
    console.info('address', address)

    this.usuario = usuario
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

