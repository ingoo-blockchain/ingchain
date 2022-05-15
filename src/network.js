const WebSocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 7545
class P2pServer {
    constructor(_port = P2P_PORT) {
        this.port = _port
        this.sockets = []
    }

    listen() {
        const { port } = this
        const server = new WebSocket.Server({ port })
        server.on('connection', socket => this.connectsocket(socket))
        return port
    }

    connectsocket(socket) {
        this.sockets.push(socket)   
        this.messageHandler(socket)
    }

    messageHandler(socket) {
        socket.on('message', data => {
            const message = JSON.parse(Buffer.from(data).toString())
            console.log(this.port,message)
            switch(message.type){
                case 'sample':
                    socket.send(JSON.stringify({name:'ingoo'}))
                break
            }
        })
    }

    getSockets() {
        return this.sockets
    }

    // 단일
    connectToPeer(newPeer) {
        const socket = new WebSocket(newPeer) // client
        socket.on('open', ()=> { this.connectsocket(socket) } )
        socket.on('error', ()=>{ console.log('소켓 연결 실패') })
    }

    // 설정 - 나중에
    connectToPeers(){

    }

}

module.exports = P2pServer