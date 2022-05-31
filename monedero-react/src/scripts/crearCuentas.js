import { authContract, smartContractAccount } from "./web3Wrapper.js"

// Hay que sacarlas de Ganache
export const users = [
  {
      name: 'dodain',
      password: 'dodain',
      wallet_address: '0x6eee5757515b400fa700D6D197e04F196982B4bD',
  },
  {
      name: 'juan',
      password: '123',
      wallet_address: '0xF1b5e63E29147440aAC7f9bC4aa148AdD8680A07',
  },
  {
      name: 'dini',
      password: '123',
      wallet_address: '0x8C99F0689008471A43545b713f0c9a44dD0eE295',
  },
]

async function crearUsuarios() {
    for (const user of users) {
        try {
            await authContract.methods.register(user).send({ from: smartContractAccount, gas: 3000000 })
            console.info(`Usuario ${user.name} creado`)
        } catch (e) {
            console.error(e)
        }
    }
}

console.info('Creando usuarios')
crearUsuarios().then(() => {
    console.info('Usuarios creados')
})
