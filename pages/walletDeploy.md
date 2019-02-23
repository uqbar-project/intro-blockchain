# Pruebas manuales de la billetera virtual

Ahora que nuestro smart contract pasó las validaciones, podemos intentar deployar en una red privada y hacer pruebas manuales.

Ya debemos tener levantado nuestro nodo y generada una cuenta según se cuenta [en esta página](./startupEthereumLocal.md).

## Configuración adicional para Truffle

Truffle ya está configurado para levantar la instancia que Ganache automáticamente mina con cuentas de prueba, para no pisar esta definición vamos a configurar otra red, en el archivo `truffle-config.js`:

```js
module.exports = {
  networks: {
    rpc: {
      ...
    },

    development: {
      ...

    // nueva red
    live: {
      host: "localhost",
      port: 8543,             // Custom port
      network_id: 58343,      // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: '0x8dc398797aedb28e31aa475c8c3e3dc61365d4c5',      // La cuenta que crearon en el inicio
    },
```

## Migración de los contratos y troubleshooting

```bash
truffle migrate --network live
```

Si tuvieron algún tipo de error anterior, es posible que les aparezca el siguiente mensaje `Error: Returned values aren't valid, did it run Out of Gas?` en cuyo caso les aconsejamos que intenten

```bash
truffle migrate --network live --reset
```

Otro error que puede surgir es `"Migrations" -- Returned error: authentication needed: password or unlock.`. Eso quiere decir que no desbloquearon la cuenta que crearon cuando inicializaron la red, esto se corrige ejecutando el siguiente comando desde la consola Geth:

```js
> personal.unlockAccount(web3.eth.coinbase, 's3cret', 15000)
                                            // o la clave que hayan utilizado para crear la cuenta
```

También es importante haber iniciado el proceso de minero, de lo contrario verán que el proceso quedará esperando a que la transacción se complete. En ese caso desde la consola Geth ejecutan

```bash
> miner.start()
```

y la transacción se completará exitosamente.

```bash

Starting migrations...
======================
> Network name:    'live'
> Network id:      58343
> Block gas limit: 26637486


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x5dc373650441dc5ea55a24cb3e1d495061f47afd481266974568edf51ef15850
   > Blocks: 2            Seconds: 80
   > contract address:    0xb9666c24F0936563dB43ce1d04eA57C83e87915B
   > account:             0x8dC398797aEdb28e31AA475c8c3E3dc61365d4C5
   > balance:             8615
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


2_deploy_wallet.js
==================

   Replacing 'Wallet'
   ------------------
   > transaction hash:    0x33584f99fe77ecfb123382e04618cb47dfe9ebb90c4b202823ebb6ed9cf7dacc
   > Blocks: 0            Seconds: 0
   > contract address:    0xf3BBbF5F0EA62270f8D7a5857b520a65c9A2A62C
   > account:             0x8dC398797aEdb28e31AA475c8c3E3dc61365d4C5
   > balance:             8640
   > gas used:            336739
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00673478 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00673478 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01243294 ETH
```

Como vemos, todo procesamiento tiene un costo, incluso el deploy es una operación para la EVM.

## 1, 2, 3... probando

