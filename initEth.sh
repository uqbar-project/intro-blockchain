# Troubleshooting
# ===============
#
# GoError: Error: account unlock with HTTP access is forbidden
#          al desbloquear el usuario, tuvimos que agregar el flag allow-insecure-unlock
#          --> https://ethereum.stackexchange.com/questions/69435/error-account-unlock-with-http-access-is-forbidden-when-unlock-an-account-in-ge
#
geth --port 3100 --networkid 58343 --nodiscover --datadir=./data --maxpeers=0  --http --http.port 8543 --http.addr 127.0.0.1 --http.corsdomain "*" --http.api "eth,net,web3,personal,miner" --syncmode full --gcmode=archive --allow-insecure-unlock