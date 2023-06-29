const express = require('express')
const app = express()
require('dotenv').config()
const {sequelize} = require('./models')
const bodyParser = require('body-parser')
const route = require('./route')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const port = process.env.PORT

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(route)

app.listen(port, (req, res) => {
	console.log(`server berjalan di localhost:${port}`)
})
