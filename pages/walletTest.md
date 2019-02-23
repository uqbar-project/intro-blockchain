# Testeo de nuestra billetera

Ahora que resolvimos nuestro primer smart contract, vamos a hacer el testeo unitario que valida las pruebas que acabamos de hacer:

## Definición de casos de prueba

Algunas pruebas que podemos hacer

* para probar el retiro de una billetera,
  * con una billetera de 100 pesos,
    * el caso feliz: retiramos 20 y nos quedan 80
    * el caso borde: retiramos 100 y nos queda 0
    * el caso borde 2: retiramos 0, esperamos un error
    * el caso inválido 1: queremos retirar -10, esperamos un error
    * el caso inválido 2: queremos retirar 120, esperamos un error
* para probar poner plata en una billetera,
  * con una billetera de 100 pesos,
    * el caso feliz: ponemos 200 y nos quedan 300
    * el caso borde: ponemos 0, esperamos un error
    * el caso inválido: queremos poner -10, esperamos un error

## Implementación de los tests

Dentro del directorio `truffle/test` crearemos un archivo javascript donde vamos a escribir los casos de prueba anteriormente definidos. En nuestro caso el nombre del archivo es `wallet.js`, la idea es que sea representativo del smart contract que estamos validando.

```js
const Wallet = artifacts.require('./Wallet.sol')
const assert = require('assert')

let walletSmartContract

contract('A Wallet with an initial balance of 100', async (accounts) => {
    const theAccount = accounts[1]
    beforeEach('initialized', async () => {
        walletSmartContract = await Wallet.new()  // vs. deployed() que devuelve un singleton
        await walletSmartContract.put(theAccount, 100)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(100, balance)
    })
    it('should allow to withdraw money if there is enough', async () => {
        await walletSmartContract.withdraw(theAccount, 20)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 80)
    })
    it('should allow to withdraw all the money', async () => {
        await walletSmartContract.withdraw(theAccount, 100)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 0)
    })
    it('should not allow to withdraw $ 0', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, 0) }, 'Value must be positive')
    })
    it('should not allow to withdraw a negative value', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, -10) }, 'Value must be positive')
    })
    it('should not allow to withdraw more money than it has', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, 120) }, 'Not enough cash')
    })
    it('should allow to put money', async () => {
        await walletSmartContract.put(theAccount, 200)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 300)
    })
    it('should not allow to put $ 0', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, 0) }, 'Value must be positive')
    })
    it('should not allow to put a negative value', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, -10) }, 'Value must be positive')
    })
})

async function testRejection(callback, errorMessage) {
    try {
        await callback()
        assert.fail('Should have failed')
    } catch (e) {
        assert.equal(e.reason, errorMessage)
    }
}
```

* La biblioteca que estamos utilizando para correr los tests es assert, podríamos utilizar chai, sinon o cualquier otra variante para javascript. En este caso hay un único describe porque solo probamos un fixture con una billetera virtual de 100 pesos, podría haber variantes y eso permitiría anidar describes.
* El método beforeEach se ejecuta antes de cada test, lo que permite evitar el efecto colateral y garantizar que cada test es independiente del otro. Para ello es importante enviar este mensaje

```js
walletSmartContract = await Wallet.new()
```

y no

```js
walletSmartContract = await Wallet.deployed()
```

ya que deployed retorna un **Singleton** y maneja siempre esa instancia, por lo que cuando saquemos o pongamos plata en la billetera eso tendrá efecto en el siguiente test, que es justamente lo que no queremos.

* Otro dato interesante es que todas las llamadas a funciones de un smart contract son asincrónicas, por lo que debemos utilizar **Promises** o encerrarlas dentro de un **async/await**.

* Para acceder al mapa `wallet` que almacena los balances de cada cuenta, debemos utilizar el mensaje `call` de la siguiente manera: `await walletSmartContract.wallet.call(theAccount)` (por supuesto también en forma asincrónica). Esto evita definir una función que solamente devuelve la variable.

* Dado que hay varios tests que repiten la misma idea: ejecutar una función asincrónica de la que se espera un cierto error, generamos una función que abstrae esa repetición. Nunca está de más recordar que aun en los terrenos más inhóspitos siempre hay lugar para el diseño.

## Ejecución de los tests

Debemos tener levantada la aplicación Ganache:

![image](../images/ganache.png)

En la consola escribimos

```bash
cd truffle
truffle test ./test/wallet.js
```

Y eso nos devuelve

```bash
Compiling ./contracts/Wallet.sol...

  Contract: A Wallet with an initial balance of 100
    ✓ should allow to withdraw money if there is enough (69ms)
    ✓ should allow to withdraw all the money (72ms)
    ✓ should not allow to withdraw $ 0
    ✓ should not allow to withdraw a negative value
    ✓ should not allow to withdraw more money than it has
    ✓ should allow to put money (67ms)
    ✓ should not allow to put $ 0
    ✓ should not allow to put a negative value

  8 passing (2s)
```

## Cómo sigo

Podés

* [Ver cómo se hace el deploy y pruebas manuales a un entorno](./walletDeploy.md)
* [Volver a la página central](../README.md)
