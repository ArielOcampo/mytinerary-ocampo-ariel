require('dotenv').config()
require('./config/passport')
require('./config/database')
const express = require('express')
const req = require('express/lib/request')
const passport = require("passport")

const Router = require('./routes/routes')


const PORT = process.env.PORT || 4000;
var cors = require('cors')
const app = express()
//middlewares
app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use('/api', Router)


app.get('*', (req, res) => {
  res.redirect('https://' + req.headers.host + req.url)
})
app.listen(PORT, () => {
  console.log('Servidor Corriendo en puerto:' + PORT)
})

const CLIENTID = process.env.CLIENT_ID