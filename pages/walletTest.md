# Testeo de nuestra billetera

Ahora que resolvimos nuestro primer smart contract, vamos a hacer el testeo unitario que valida las pruebas que acabamos de hacer:

## Definición de casos de prueba

Algunas pruebas que podemos hacer

* para probar el retiro de una billetera,
  * con una billetera de 100 pesos,
    * el caso feliz: retiramos 20 y nos quedan 80
    * el caso borde, retirar el total: retiramos 100 y nos queda 0 (podríamos anular el primer test con éste)
    * el caso borde 2, monto cero: retiramos 0, esperamos un error
    * el caso inválido 1, retiro de un monto negativo: queremos retirar -10, esperamos un error
    * el caso inválido 2, retiro de más que la disponibilidad actual: queremos retirar 120, esperamos un error
* para probar el depósito de plata en una billetera que tiene 100 de saldo,
    * el caso feliz: ponemos 200 y nos quedan 300
    * el caso borde: ponemos 0, esperamos un error
    * el caso inválido, monto negativo: queremos poner -10, esperamos un error

## Implementación de los tests

Dentro del directorio `test` crearemos un archivo TS donde vamos a escribir los casos de prueba anteriormente definidos. En nuestro caso el nombre del archivo es `Wallet.ts`, la idea es que sea representativo del smart contract que estamos validando.

- La biblioteca que estamos utilizando para correr los tests es chai, podríamos utilizar cualquier otra variante para JS/TS. 
- Podemos anidar describes para agrupar distintas funcionalidades del Wallet.
- Para garantizar que no hay efecto colateral, tenemos un ambiente EVM simulado, por lo tanto en el beforeAll vamos a deployar el smart contract que queremos testear. También vamos a crear una cuenta con $ 100 iniciales.
 
```ts
describe('Wallet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWalletSingleAccount() {
    const lockedAmount = parseGwei('1')

    // Contracts are deployed using the first signer/account by default
    const [otherAccount] = await hre.viem.getWalletClients()

    const wallet = await hre.viem.deployContract('Wallet', [], {
      value: lockedAmount,
    })

    await wallet.write.put([otherAccount.account.address, BigInt(100)])

    return {
      wallet,
      address: otherAccount.account.address,
    }
  }

  describe('Wallet', function () {

    it('should have an initial balance > 0', async function () {
      const { wallet, address } = await loadFixture(deployWalletSingleAccount)

      expect(await wallet.read.balance([address])).to.equal(BigInt(100))
    })

    ...
```

## Ejecución de los tests

No es necesario tener levantado el nodo local, ni nada extra. Ejecutamos

```bash
npx hardhat test
```

Y eso nos devuelve

```bash
  Auth
    register
      ✔ should create a single user (643ms)
      ✔ should fail while trying to register the second time
    login
      ✔ should work if correct credentials are sent
      ✔ should fail if wrong user is sent
      ✔ should fail if wrong password is sent
    get_address
      ✔ should get the right address

  Wallet
    Wallet
      ✔ should have an initial balance > 0
      withdraw
        ✔ should allow to withdraw money if there is enough
        ✔ should allow to withdraw all the money
        ✔ should not allow to withdraw $0
        ✔ should not allow to withdraw negative money
        ✔ should not allow to withdraw more money than it has
      put
        ✔ should allow to put money
        ✔ should not allow to put $0
        ✔ should not allow to put a negative value


  15 passing (775ms)

```

## Cómo sigo

Podés

* [Ver cómo se hace el deploy y pruebas manuales a un entorno](./walletDeploy.md)
* [Volver a la página central](../README.md)
