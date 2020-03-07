import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

let walletABI = [{ "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "wallet", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "int256", "name": "howMuch", "type": "int256" }], "name": "put", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "int256", "name": "howMuch", "type": "int256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balance", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "payable": false, "stateMutability": "view", "type": "function" }]

export const walletAddress = '0x77537a097aB0BeCC91129789eF0Ead0c5393bfc1'
web3.eth.defaultAccount = web3.eth.accounts[0]

const walletContract = new web3
    .eth
    .Contract(walletABI, walletAddress)

export const txAccount = '0x4Adc2F0b01A4e51c2e5721e168415ABebE0E62ff'

export { walletContract }