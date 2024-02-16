const users = (addresses) => [
  {
    name: 'dodain',
    password: 'dodain',
    wallet_address: addresses[0],
    existing: false,
  },
  {
    name: 'juan',
    password: '123',
    wallet_address: addresses[1],
    existing: false,
  },
  {
    name: 'dini',
    password: '123',
    wallet_address: addresses[2],
    existing: false,
  },
  {
    name: 'jorge',
    password: '123',
    wallet_address: addresses[3],
    existing: false,
  },
  {
    name: 'viotti',
    password: '123',
    wallet_address: addresses[4],
    existing: false,
  },
]

export const crearUsuarios = async (addresses, authContract) => {
  console.info('Creando cuentas')
  const smartContractAccount = addresses[0]

  for (const user of users(addresses)) {
    try {
      const userExist = await authContract.methods.exists(user.name).call()
      if (userExist) {
        console.info(`Usuario ${user.name} ya existe`)
      } else {
        console.info(user)
        await authContract.methods.register(user).send({ from: smartContractAccount, gas: 3000000 })
        console.info(`Usuario ${user.name} creado`)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
