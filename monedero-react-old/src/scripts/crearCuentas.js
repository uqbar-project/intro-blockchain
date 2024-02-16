import * as blockchainService from './blockchainService.js'

const { addresses, authContract } = blockchainService

const smartContractAccount = addresses[0]

// Hay que sacarlas de Ganache
export const users = [
  {
      name: 'dodain',
      password: 'dodain',
      wallet_address: addresses[0],
  },
  {
      name: 'juan',
      password: '123',
      wallet_address: addresses[1],
  },
  {
      name: 'dini',
      password: '123',
      wallet_address: addresses[2],
  },
  {
    name: 'jorge',
    password: '123',
    wallet_address: addresses[3],
},
]

async function crearUsuarios() {
    for (const user of users) {
        try {
            const userExist = await authContract.methods.exists(user.name).call()
            if (userExist) {
                console.info(`Usuario ${user.name} ya existe`)
            } else {
                await authContract.methods.register(user).send({ from: smartContractAccount, gas: 3000000 })
                console.info(`Usuario ${user.name} creado`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}

console.info('Creando usuarios')
crearUsuarios().then(() => {
    console.info('Script finalizado')
})
