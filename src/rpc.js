const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true,}))
app.get('/',(req,res)=>{
    res.send('RPC')
})

//GET getBlock
app.get('/getBlock',(req,res)=>{
    res.send('getBlock')
})
//GET mineBlock
app.get('/mineBlock',(req,res)=>{
    res.send('mineBlock')
})
//GET peers
app.get('/peers',(req,res)=>{
    res.send('peers')
})
//POST addPeer
app.post('/addPeer',(req,res)=>{
    res.send('addPeer')
})


app.listen(3000,()=>{
    console.log('Server Start')
})