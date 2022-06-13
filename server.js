const express = require('express')
const req = require('express/lib/request')
const app = express()

const PORT = 4000
app.get('/', (req, res) => {
  res.send('SERVER CREADO')
})
app.listen(PORT, () => {
  console.log('Servidor Corriendo en puerto:' + PORT)
})