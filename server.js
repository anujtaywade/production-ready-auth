const express = require('express')
const app = require()
const port = 3000


app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})