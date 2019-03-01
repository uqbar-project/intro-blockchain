
# Creando una aplicación React para interactuar con la billetera virtual

## Cómo conectar nuestro smart contract

En la consola Truffle escribimos

```js
JSON.stringify(Wallet.abi) // abi => Application Binary Interface
```

El output será importante en breve.

## Creando la aplicación React

En la consola de nuestro sistema operativo escribimos

```bash
create-react-app react-dapp  // tienen que haber hecho npm i -g create-react-app previamente
```

Agregamos la biblioteca web3, que nos permite conectarnos al nodo Ethereum:

```bash
cd react-dapp
npm i web3
```

Y además vamos a trabajar con componentes de frontend de ...

```bash
npm i antd
```

## Definiendo el setup

Crearemos un archivo setup, donde tomaremos la configuración según el archivo `truffle-config.js`:

```js
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8543"))
    // hay que usar el puerto y host que tiene truffle-config.js
let walletABI = ... 
    // copiar el output de la consola truffle cuando se ejecutó el comando
    // JSON.stringify(Wallet.abi)
    // ojo si crean funciones adicionales, deben volver a ejecutar el comando JSON.stringify(Wallet.abi)
    // y copiarlo nuevamente porque no estarán publicadas las funciones

...
let walletAddress = '0x2C008875Ae8B76C71755a2F4b961Ecb08049C647'
    // la cuenta o valor que sale de

![image](../images/deDondeSacarContractAddress.png)

web3.eth.defaultAccount = web3.eth.accounts[0]

const walletContract = web3
    .eth
    .contract(walletABI)
    .at(walletAddress)
export {walletContract}
```

## Agregamos una función más para obtener el balance en forma más cómoda

## Ganache

Levantamos Ganache y apuntamos al 8545

## TODO

- manejo de errores de put / withdraw
- validación de número
- logout de la app
- explicación de esta página

## Otros tutoriales

* [Ratings de peliculas](https://medium.com/@takleakshar/how-to-build-a-decentralized-full-stack-app-in-ethereum-and-react-42e63d45a208)
* [Aplicaciones React descentralizadas](http://reactdapps.com/)
