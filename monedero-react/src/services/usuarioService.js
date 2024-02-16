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

    this.usuario = usuario
    this.address = address
    const saldoBilletera = await billeteraService.getSaldo()
    this.saldo = Number(saldoBilletera ?? 0)
  }

  init() {
    this.usuario = ''
    this.address = ''
    this.saldo = 0
  }

}

export const usuarioService = new UsuarioService()

