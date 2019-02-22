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

## Implementación

Para correrlo, hay que usar ganache o te volvés loco con `Missing trie node`

## Ejecutando los tests

Levantamos primero la aplicación Ganache:

![image](../images/ganache.png)

En la consola escribimos

```bash
$ cd truffle
$ truffle compile
$ truffle test ./test/wallet.js
```

## Deploy

### Generando el Script

### 
