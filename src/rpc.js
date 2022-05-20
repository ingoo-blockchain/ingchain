const rpc = require('node-json-rpc')

const option = {
    port:3456,
    host:'127.0.0.1',
    path:'/',
    strict:false,
}

const rpcServer = rpc.Server(option)

rpcServer.addMethod('shutdown', (param, callback) => {
    console.log('shutdown을 요청받았다~')
})

