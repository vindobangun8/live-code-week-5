// if(process.env.NODE_ENV == "development"){
//     require('dotenv').config
// }

const express = require('express')
const cors = require('cors')
const index = require('./route/index')
let app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',index)



app.listen(PORT,()=>{
    console.log(`Listenin on port ${PORT}`)
})