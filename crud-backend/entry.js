var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')

var app = express()
const route = require('./route/routes')

mongoose.connect("mongodb://localhost:27017/shoppinglist")

mongoose.connection.on('connected', ()=>{
  console.log('connection established')
})

mongoose.connection.on('error', (err)=> {
  console.log('failed to establish connection' + err)
})

const PORT=3000

app.listen(PORT, () => {
  console.log("server started")
})

app.use(cors())

app.use(bodyparser.json())
app.use('/api', route)

app.get('/', (req, res) => {
  res.send('some changes')
})
