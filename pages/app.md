
# Creando una aplicación React para interactuar con la billetera virtual

## Cómo conectar nuestro smart contract

## Cómo exportar a un ABI

Instalamos el [abi-exporter](https://www.npmjs.com/package/hardhat-abi-exporter) y ejecutamos

```bash
npx hardhat export-abi
```

Levantamos el entorno:

```bash
npx hardhat node
```

En la carpeta `abi` están los JSON, podemos generar links simbólicos a los archivos en nuestro proyecto React:

```bash
# parados en la carpeta monedero-react/src/services
ln ../../../monedero-hardhat/abi/contracts/Wallet.sol/Wallet.json Wallet.json
ln ../../../monedero-hardhat/abi/contracts/Auth.sol/Auth.json Auth.json
```

Estos jsons que se generan contienen la interfaz para saber qué parámetros tiene cada uno de los métodos de nuestros smart contracts.

## Aplicación React

La creamos mediante vite, con los siguientes componentes

* router de React
* [Primereact](https://www.primefaces.org/primereact/)
* y la biblioteca web3, que nos permite conectarnos al nodo Ethereum

Pueden ver el archivo `package.json` para más información.

## Conexión a la blockchain

En el archivo [blockchainService](../monedero-react/src/services/blockchainService.js) accedemos a los links de los jsons y le attachamos una cuenta, que es la que va a pagar cada función `payable` (la que produce efectos colaterales, como put y withdraw):

```ts
import walletABI from './Wallet.json' 
import authABI from './Auth.json'
import { crearUsuarios } from './crearUsuarios'

web3.eth.defaultAccount = web3.eth.accounts[0]

// Importante, cuando deployemos hay que registrar el contract address que nos de la consola de hardhat
//
// Por ejemplo:
//
// eth_sendTransaction
//   Contract deployment: Wallet
//   Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
//   Transaction:         0xe9422757135956f4c9052db48e0e07253fcf247f6cea2e350fad21e70727c2fc
//   From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
//   Value:               0 ETH
//   Gas used:            399536 of 399536
//   Block #2:            0x08ab3ac6cc3937bf415af52340f821f78fbf840d4346d334b4fa03b4ab3caaff
//
// nos quedamos con el contract address
export const walletContract = new web3
  .eth
  .Contract(walletABI, '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512')
```

## Levantar la app

- recordá que tiene que estar levantado el nodo: `npx hardhat node`
- si esa instancia no tiene nuestro/s Smart Contract/s, debemos compilar e instalarlo en dicha red mediante el comando: `npx hardhat run scripts/deploy.ts`


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

Recordá que para invocar al mensaje `send` (anteriormente `sendTransaction`), es necesario pasar una dirección que tenga suficiente gas para realizar la operación. Nosotros le pasamos una de las cuentas que te genera hardhat inicialmente, con 100 ethers (es suficiente como para hacer pruebas tranquilos).

## Otros tutoriales

* [Ratings de peliculas](https://medium.com/@takleakshar/how-to-build-a-decentralized-full-stack-app-in-ethereum-and-react-42e63d45a208)
* [Aplicaciones React descentralizadas](http://reactdapps.com/)

## Cómo sigo

Ahora podés

* [Ver cómo se configura CI](./ci.md)
* [Volver a la página central](../README.md)