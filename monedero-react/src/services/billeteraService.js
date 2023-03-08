import { usuarioService } from "./usuarioService"
import { walletContract } from "./blockchainService"
import { handleRPCError } from "./errorHandling"

class BilleteraService {
  
  async poner(monto) {
    try {
      await walletContract.methods
        .put(usuarioService.address, monto)
        .send({ from: usuarioService.address })
      const balance = this.getSaldo()
      return balance
    } catch (err) {
      throw new Error(handleRPCError(err))
    }
  }

  async sacar(monto) {
    try {
      await walletContract.methods
        .withdraw(usuarioService.address, monto)
        .send({ from: usuarioService.address })
      const balance = await this.getSaldo()
      return balance
    } catch (err) {
      throw new Error(handleRPCError(err))
    }
}

  async getSaldo() {
    return walletContract.methods.balance(usuarioService.address).call()
  }

}

export const billeteraService = new BilleteraService()
