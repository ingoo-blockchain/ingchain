const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())


const auth = (str,req,res,next) => {
    console.log(req.headers)
    res.send(str)
}

app.use((req,res,next)=>{
    auth('hello world',req,res,next)
})

app.listen(3005,()=>{
    console.log('hello world!')
})