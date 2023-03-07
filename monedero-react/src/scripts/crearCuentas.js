import Web3 from 'web3'

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Se obtiene de ingresar a `truffle console` y pedirle `JSON.stringify(Wallet.abi)`
const authABI = [{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"users","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"},{"internalType":"address","name":"wallet_address","type":"address"},{"internalType":"bool","name":"existing","type":"bool"}],"internalType":"struct Auth.User","name":"user","type":"tuple"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"get_address","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

const smartContractAccount = '0xE9BbA9735f430156eB563C793Dc53b8F42C783DE'

const authContract = new web3
  .eth
  .Contract(authABI, '0x5B50e99C6519F0563c752ebeF473a49F24101532')

// Hay que sacarlas de Ganache
export const users = [
  {
      name: 'dodain',
      password: 'dodain',
      wallet_address: '0xE9BbA9735f430156eB563C793Dc53b8F42C783DE',
  },
  {
      name: 'juan',
      password: '123',
      wallet_address: '0x59283dd5EBF26705f135A3d0d7dDc9deEA45ef68',
  },
  {
      name: 'dini',
      password: '123',
      wallet_address: '0x3A5123002c4546dE724C79B10F610930B2Ec2207',
  },
  {
    name: 'jorge',
    password: '123',
    wallet_address: '0x77D63C08b727cA038EB943BAa3B37c7De48BB208',
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
