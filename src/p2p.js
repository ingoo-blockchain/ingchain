const { Server } = require('ws')

const sockets = []

const QUERY_LATEST = 0
const QUERY_ALL = 1
const RESPONSE_BLOCKCHAIN = 2

const p2pServer = (port) => {
    const server = new WebSocket.Server({port})
    server.on('connection', ws => {
        initConnection(ws)       
    })
}

const getConnection = () => sockets

const initConnection = ws => callback => {

}