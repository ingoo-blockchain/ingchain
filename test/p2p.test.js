const P2pServer = require('../src/network')
const { log } = require('mocha-logger')
const assert = require('assert')


describe('network', () => {
    let ws1, ws2 
    before(()=>{
        ws1 = new P2pServer()
        ws2 = new P2pServer(8545)
    })

    it('웹소켓(ws1) 접속 테스트',()=>{
        log( 'Websocket port : ', ws1.listen() )
        
    })

    it('웹소켓(ws2) 접속 테스트', ()=> {
        log('Websocket port ', ws2.listen())
    })

    it('Sockets 배열 추가 확인',()=>{
        const arr1 = ws1.getSockets()
        const arr2 = ws2.getSockets()
        assert.equal( arr1.length, arr2.length )
    })

    it('ws2 -> ws1 로 연결하기', ()=>{
        ws2.connectToPeer('ws://127.0.0.1:7545')
    })

    it('ws2 -> ws1 데이터 보내기',()=>{
        const message = JSON.stringify({type:'sample'})
        const socket = ws1.getSockets()[0]
        socket.send(message , response => {
            log(response)
        })

        socket.on('message', response => {
            log(response)
        })
    })

    it('웹소켓 연결 끊기',()=>{
        process.exit(0)
    })
})