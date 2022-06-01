import Web3 from 'web3'

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Se obtiene de ingresar a `truffle console` y pedirle `JSON.stringify(Wallet.abi)`
const authABI = [{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"users","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"internalType":"struct Auth.User","name":"user","type":"tuple"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"get_address","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

const smartContractAccount = '0xdCcD91A92D1d21D98D237545e6608cC364199fdd'

const authContract = new web3
  .eth
  .Contract(authABI, '0x7bFb771b19Df2f5f97EeAae65C61713Bd1069e6A')

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
  {
    name: 'jorge',
    password: '123',
    wallet_address: '0xAac540961350fE462cc7322c54262169dB448b8e',
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
