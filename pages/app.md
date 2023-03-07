
# Creando una aplicación React para interactuar con la billetera virtual

## Cómo conectar nuestro smart contract

En la consola Truffle escribimos

```js
JSON.stringify(Wallet.abi) // abi => Application Binary Interface
```

El output será importante en breve.

## Aplicación React

La creamos mediante CRA (create-react-app), con los siguientes componentes

* router de React
* [Primereact](https://www.primefaces.org/primereact/)
* y la biblioteca web3, que nos permite conectarnos al nodo Ethereum

Pueden ver el archivo `package.json` para más información.

## Conexión a la blockchain

La configuración del archivo `truffle-config.js` nos permitirá crear un archivo donde definimos

- las direcciones válidas para usar
- cada smart contract fue creado utilizando una dirección, vamos a definirlo aquí
- y para poder obtener una referencia a cada smart contract (Wallet, Auth) vamos a utilizar el abi que define los tipos de cada función que podemos ejecutar

Esto aparece enn el archivo [blockchainService](./src/../../monedero-react/src/services/blockchainService.js).

```js
export const addresses = [
  '0xE9BbA9735f430156eB563C793Dc53b8F42C783DE',
  '0x59283dd5EBF26705f135A3d0d7dDc9deEA45ef68',
  '0x3A5123002c4546dE724C79B10F610930B2Ec2207',
  '0x77D63C08b727cA038EB943BAa3B37c7De48BB208',
  '0xbB0b6deBABeAae893fe34f0A9dD2a411248b94B1',
]

// Cuentas a generar
export const cuentas = [
  {
      address: addresses[0],
      balance: 0,
      username: 'dodain'
  },
  {
      address: addresses[1],
      balance: 0,
      username: 'juan'
  },
  {
      address: addresses[2],
      balance: 0,
      username: 'dini'
  },
]

// Se obtiene de ingresar a `truffle console` y pedirle `JSON.stringify(Wallet.abi)` y `JSON.stringify(Auth.abi)`
const walletABI = [...]
const authABI = [...]

// hay que usar el puerto y host que tiene truffle-config.js
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Importante, cuando deployemos hay que registrar el contract address que nos da la truffle console
// Replacing 'Wallet'
// ------------------
// > transaction hash:    0x32a69f7151fc988f3dbeaf9132dc5492704dac7889fc8f03dfdc27585ddbc30d
// > Blocks: 0            Seconds: 0
// > contract address:    0x84F39C6a769ffBFBb8F88f03c989f0584c71F718
export const walletContract = new web3
  .eth
  .Contract(walletABI, '0xf4C0837214122137BC675a5b719D6c18582a1580')

export const authContract = new web3
  .eth
  .Contract(authABI, '0x5B50e99C6519F0563c752ebeF473a49F24101532')
```

Para obtener la address correspondiente al Smart Contract Wallet, podemos

1. buscar la transacción asociada a la creación de dicho smart contract

![image](../images/deDondeSacarContractAddress.png)

2. o, mucho más fácil, asociar nuestro proyecto Truffle y ver en la solapa Contracts cuáles son las addresses asociadas al Wallet

![wallet address](../images/ganacheTruffle.gif)

## Levantar la app

- levantar Ganache en un puerto, el que venimos usando es el 8545
- si esa instancia no tiene nuestro Smart Contract, debemos compilar e instalarlo en dicha red mediante los comandos

```bash
truffle compile --network development           # o el nombre de la red definido en truffle-config.js
truffle migrate --reset --network development
```

## Creación de usuarios

Para crear los usuarios evaluamos en la carpeta `monedero-react` el siguiente comando:

```bash
npm run seed
```

En [este archivo](./../monedero-react/src/scripts/crearCuentas.js) podés fijarte los usuarios y contraseñas que se crean, tomando como base el mismo archivo [blockchainService.js](./../monedero-react/src/scripts/blockchainService.js) que tiene un soft link hacia el que define la aplicación React.

## Demo de la app

Iniciar la aplicación React con el comando `npm start`:

![Demo Wallet](../images/demoWallet3.gif)

### Cómo funciona el login

![Formulario Login](../images/WalletLoginForm.png)

Internamente el login maneja como estado usuario y password, y se valida delegando al singleton usuarioService

- el nombre de la persona se asocia a un mapa de direcciones (addresses), por el momento está hardcodeado en un archivo local de la aplicación (esto podría externalizarse a cualquier medio persistente que ya hemos visto)
- luego hacemos la consulta por _address_ a la billetera mediante una llamada al objeto _walletContract_ generado por web3 que como resultado nos devolverá el _balance_ (saldo) de la cuenta
- el usuarioService como singleton de la aplicación nos sirve para almacenar los datos de la persona logueada: nombre, address de la blockchain y saldo actual

Por motivos didácticos simplificamos el login, donde ni siquiera hay validación de contraseña.

### Formulario que muestra la billetera

![Formulario Wallet](../images/WalletForm.png)

En el formulario de la billetera, recibimos la información del nombre y saldo de la cuenta, al que le agregamos como estado el monto a poner o sacar. Ambas operaciones se delegan en el usuarioService, que

- delega la acción put/withdraw al _walletContract_ de web3. Es decir, que el código de negocio está - escrito en el Smart Contract, en el lenguaje Solidity. 
- Esta es una decisión de diseño, para no repetir la misma operación en React: en ningún momento se suma o resta al saldo de la cuenta. Esto permite por ejemplo no duplicar las validaciones
- Otro aspecto importante es que todas las llamadas a web3 **son asincrónicas**
- La forma entonces de recuperar el saldo actual, es haciendo otra llamada para obtener el saldo, al igual que hicimos en el login (en este caso llamamos al hook `setSaldo` cuando lo obtenemos y eso renderiza nuevamente la vista)
- Por último, inicializamos el state del formulario, blanqueando el monto a ingresar

## Llamadas a web3: call vs. transaction

Antes que nada, podríamos haber definido un backend para trabajar las llamadas a web3, pero preferimos mantener la arquitectura lo más simple posible. 

### Call

Veamos cómo se resuelve la llamada para obtener el balance:

```js
const balance = await walletContract.methods.balance(account.address).call()
```

En general [hay varias formas de resolver la llamada](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id12), pero la que mejor resultado nos dio fue seguir la sintaxis:

```js
objetoSmartContract.methods.metodoAEjecutar(parametros).call()
```

donde call() debe invocarse sin parámetros, que van seguidos al método a ejecutar. Recordemos que el objeto walletContract se obtiene en el archivo `blockchainService.js`:

```js
const walletContract = new web3
    .eth
    .Contract(walletABI, walletAddress)
```

Esta es una operación que no produce un nuevo bloque en la blockchain, es simplemente una consulta, por eso se define en el Smart Contract como un método `view`:

```solidity
    function balance(address owner) public view returns(int256) {
        return wallet[owner];
    }
```

### Transaction

Por otra parte, poner plata en la billetera es una operación que requiere una cuenta que pague la operación. Por lo tanto, no podemos utilizar el mensaje `call()`, sino `send()`:

```js
await walletContract.methods.put(account.address, amount).send({ from: txAccount })
```

Para invocar al mensaje `send` (anteriormente `sendTransaction`), es necesario pasar una dirección que tenga suficiente gas para realizar la operación. Eso se consigue mediante estos pasos:

1) Desde Ganache, solapa Accounts, buscamos alguna de las direcciones que viene cuando levanta la aplicación:

![image](../images/ganache-accounts.png)

Por ejemplo, podemos elegir la primera. Copiamos ese address.

2) Lo pegamos en la variable `txAccount` del archivo `setup.js`

```js
export const txAccount = '0x884e8452cd8e45c0A117E6D666C6d1510160441F'
```

## Otros tutoriales

* [Ratings de peliculas](https://medium.com/@takleakshar/how-to-build-a-decentralized-full-stack-app-in-ethereum-and-react-42e63d45a208)
* [Aplicaciones React descentralizadas](http://reactdapps.com/)
