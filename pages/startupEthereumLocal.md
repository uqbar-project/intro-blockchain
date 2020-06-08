
# Startup del entorno Ethereum local

Los pasos para tener una red levantada son

* iniciar la red
* conectarse al nodo por la consola Geth
* crear una cuenta
* iniciar el proceso de minado
* preparar la configuración para desarrollar Smart Contracts

## Inicio del nodo

Continuando con este [buen tutorial](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d), una vez que [hayas instalado todos los componentes necesarios](./entorno.md), podemos levantar la red Ethereum localmente. Para hacer esto debemos ir al directorio raíz de este proyecto, abrir una terminal y escribir

```bash
geth --port 3000 --networkid 58343 --nodiscover --datadir=./data --maxpeers=0  --rpc --rpcport 8543 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --syncmode full --gcmode=archive
```

Geth recordamos que es la implementación de Ethereum en este caso en el lenguaje Go, y lo que estamos haciendo es levantar la red en el equipo local (127.0.0.1) diferentes servicios. Además de eth y net (la red privada), estaremos trabajando con

* **personal**: el servicio que administra las cuentas, tanto la de los smart contracts como las personales
* **web3**: la biblioteca que permitirá conectarnos a un nodo Ethereum (puede ser local o remoto) mediante el protocolo http o IPC. Recordá que tenés [la página oficial con la documentación](https://web3js.readthedocs.io/en/1.0/)
* **miner**: el servicio de minero que cuando lo levantes te permitirá deployar contratos y enviar transacciones

Otras configuraciones que acabamos de escribir son:

* **networkid**: puede ser cualquier número que lo identifique para que los otros nodos se conecten. Hay algunos números reservados, en el [tutorial](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d) los enumera.
* **nodiscover**: deshabilita la búsqueda de nodos (la conexión se hará manual)
* **datadir**: el directorio donde está la _blockchain_
* **maxpeers**: cantidad de nodos o _peers_ que pueden conectarse a la red (0: la red está deshabilitada, por defecto son 25)
* **rpc**: habilita HTTP-rpc
* **rpcapi**: permite utilizar los métodos remotos de web3js en la consola Geth, como veremos a continuación

Esto produce un output similar a éste en nuestra consola

```bash
INFO [02-16|09:26:09] Maximum peer count                       ETH=0 LES=0 total=0
INFO [02-16|09:26:09] Starting peer-to-peer node               instance=Geth/v1.8.4-stable-2423ae01/linux-amd64/go1.10
INFO [02-16|09:26:09] Allocated cache and file handles         database=/home/fernando/workspace/blockchain-2019/intro-blockchain/data/geth/chaindata cache=768 handles=512
INFO [02-16|09:26:10] Writing default main-net genesis block
INFO [02-16|09:26:10] Persisted trie from memory database      nodes=12356 size=2.34mB time=35.681717ms gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [02-16|09:26:10] Initialised chain configuration          config="{ChainID: 1 Homestead: 1150000 DAO: 1920000 DAOSupport: true EIP150: 2463000 EIP155: 2675000 EIP158: 2675000 Byzantium: 4370000 Constantinople: <nil> Engine: ethash}"
INFO [02-16|09:26:10] Disk storage enabled for ethash caches   dir=/home/fernando/workspace/blockchain-2019/intro-blockchain/data/geth/ethash count=3
INFO [02-16|09:26:10] Disk storage enabled for ethash DAGs     dir=/home/fernando/.ethash                                                     count=2
INFO [02-16|09:26:10] Initialising Ethereum protocol           versions="[63 62]" network=58343
INFO [02-16|09:26:10] Loaded most recent local header          number=0 hash=d4e567…cb8fa3 td=17179869184
INFO [02-16|09:26:10] Loaded most recent local full block      number=0 hash=d4e567…cb8fa3 td=17179869184
INFO [02-16|09:26:10] Loaded most recent local fast block      number=0 hash=d4e567…cb8fa3 td=17179869184
INFO [02-16|09:26:10] Regenerated local transaction journal    transactions=0 accounts=0
INFO [02-16|09:26:10] Starting P2P networking
INFO [02-16|09:26:10] RLPx listener up                         self="enode://2a585e1ca4aad8d167446164a05eb1a318dff5f255a35fe215e167df5067d152e566088f90807279d9403697c66e2167104036b3ee49b882fb17f10763363644@[::]:3000?discport=0"
INFO [02-16|09:26:10] IPC endpoint opened                      url=/home/fernando/workspace/blockchain-2019/intro-blockchain/data/geth.ipc
INFO [02-16|09:26:10] HTTP endpoint opened                     url=http://127.0.0.1:8543                                                   cors=* vhosts=localhost
```

## Conectándonos al nodo

Vamos a conectar nuestro primer nodo a la red, utilizando una nueva terminal y el mismo programa `geth`

```bash
geth attach http://127.0.0.1:8543
```

Nos conectamos al equipo local (127.0.0.1) y al puerto que anteriormente definimos en la configuración rpcport.

```bash
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.4-stable-2423ae01/linux-amd64/go1.10
 modules: eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0
```

Vemos que el nodo tiene instalados los servicios eth, miner, net, personal, rpc y web3, justamente los que definimos al levantar la red.

## Creando una cuenta

La consola geth permite escribir instrucciones en Javascript dentro de la red, por ejemplo para crear nuestra primera cuenta que represente a una persona. A partir de ahora deberías ver un `>` como prompt de la consola Geth:

```bash
nuevaCuenta = personal.newAccount('s3cret')
```

El método [newAccount de personal](https://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#newaccount) permite crear una cuenta, en este caso externa que representaría una persona, pasándole la contraseña (sí, no vamos a usarla en una aplicación http, lo sabemos :)).

Lo que nos devuelve el método es el _address_ de la nueva cuenta: recordemos que las cuentas externas tienen una dirección y una clave privada.

Y ¿qué podemos hacer con eso? Podemos ver a qué apunta la variable personal

```bash
personal
{
  listAccounts: ["0xf4a3829a9e96d6bff51fa5df7e409c4579669a39"],
  listWallets: [{
  ...
```

Esto nos da una idea de la estructura interna y de los mensajes que podemos enviarle (los que son funciones). Por ejemplo podemos preguntarle la lista de cuentas:

```bash
personal.listAccounts
["0xf4a3829a9e96d6bff51fa5df7e409c4579669a39"]
```

Podemos chequear cuánto ether tiene la cuenta que acabamos de crear:

```bash
web3.fromWei(eth.getBalance(eth.coinbase), 'ether')
```

## Proceso de minado

Por el momento, nuestro único nodo tiene levantada la EVM (Ethereum Virtual Machine) pero no acepta transacciones; entonces vamos a iniciar el minero para este nodo. Parados siempre en la consola Javascript geth (la segunda terminal), iniciamos dicho proceso:

```bash
> miner.start()
null
```

La respuesta `null` no es muy amigable, pero en la primera terminal vemos reflejada la primera ejecución del proceso minero:

```bash
INFO [02-16|10:09:59] Starting mining operation
INFO [02-16|10:09:59] Commit new mining work                number=1 txs=0 uncles=0 elapsed=485.43µs
```

Claro, por el momento no tenemos transacciones (`txs=0`), esto vendrá a continuación.

## Preparar la configuración para desarrollar Smart Contracts

Por último, vamos a crear un directorio donde podremos desarrollar nuestros smart contracts con la herramienta **Truffle**:

```bash
mkdir truffle   # truffle o cualquier otro nombre que elijan para la carpeta
cd truffle
truffle init    # inicialización de los archivos y directorios de truffle
```

Podemos ver la estructura de nuestro directorio truffle, donde tendremos:

* un archivo `truffle-config.js` que nos permitirá elegir el lenguaje para compilar los smart contracts (**Solidity**), el framework de testeo unitario (**Mocha**), el puerto y el host al que nos conectaremos para hacer los deploys de los smart contracts, entre otras cosas.
* un directorio `contracts` donde hay un smart contract que generó Truffle: `Migrations.sol`, y donde estaremos escribiendo nuestras propias definiciones
* un directorio `tests` donde podremos escribir las pruebas unitarias que validen nuestros smart contracts
* un directorio `migrations` donde tendremos que escribir código en javascript que ayude a Truffle a hacer los deploys a la red Ethereum
* y un directorio `build` donde dejaremos el resultado de la "compilación"

# Cómo sigo

Ahora podés

* [Ver el primer ejemplo de smart contract, una billetera virtual](./wallet.md)
* [Volver a la página central](../README.md)
