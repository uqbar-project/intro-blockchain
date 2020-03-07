# Troubleshooting
# ===============
#
# GoError: Error: account unlock with HTTP access is forbidden
#          al desbloquear el usuario, tuvimos que agregar el flag allow-insecure-unlock
#          --> https://ethereum.stackexchange.com/questions/69435/error-account-unlock-with-http-access-is-forbidden-when-unlock-an-account-in-ge
#
geth --port 3000 --networkid 58343 --nodiscover --datadir=./data --maxpeers=0  --rpc --rpcport 8543 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --syncmode full --gcmode=archive --allow-insecure-unlock