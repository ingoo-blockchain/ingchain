const WebSocket = require('ws')
const { createAction, stringToJson } = require('../src/utils/socketUtils')
const BlockChain = require('./block/blockchain')
const P2P_PORT = process.env.P2P_PORT || 7545
const messageType = require('./utils/message')


class P2pServer{
    constructor(_blockchain, _port = P2P_PORT) {
        this.blockchain = _blockchain
        this.port = _port
        this.sockets = []
    }

    getSockets(){ return this.sockets }

    listen() {
        const { port } = this
        const server = new WebSocket.Server({ port })
        server.on('connection', socket => {
            console.log(`socket connected`)
            this.connectsocket(socket) 
        })
        return port
    }

    connectsocket(socket) {
        this.sockets.push(socket)   
        this.messageHandler(socket)
    }

    messageHandler(socket) {
        const callback = data => {
            const message = stringToJson(data)
            if ( message === null ) return
            const send = this.send(socket)
            switch (message.type) {
                case messageType.latest_block:
                    console.log(this.port, message.data)
                    send(messageType.all_blocks,[this.blockchain.lastBlock()])
                break;
                case messageType.all_blocks:
                    console.log(this.port, message.data)
                    send(messageType.response_block,this.blockchain.blocks)
                break;
                case messageType.response_block:
                    const receivedBlocks = message.data
                    console.log(this.port, receivedBlocks)
                break;
                case "ingoo":
                    console.log(this.port, message.data)
                break;
            }   
        }
        socket.on('message', callback)
    }

    send(socket) { 
        return function(type,data){
            socket.send( createAction(type,data) )
        }
    }

    broadcast(type,data){
        const ws = this.getSockets()
        ws.forEach( socket => { socket.send( createAction(type,data) ) })
    }

    // 설정 - 나중에
    connectToPeers(){

    }

    // 단일
    connectToPeer(newPeer) {
        const socket = new WebSocket(newPeer) // client
        socket.on('open', ()=> { this.connectsocket(socket) } )
        socket.on('error', ()=>{ console.log('소켓 연결 실패') })
    }

    handleBlockChain(){

    }
}

module.exports = P2pServer