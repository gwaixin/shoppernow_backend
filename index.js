const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3006
const DBSCHEMA = process.env.DB_SCHEMA || 'mongodb'
const DBHOST = process.env.DB_HOST || 'localhost'
const DBNAME = process.env.DB_NAME || 'shoppernow'

// Prepare mongodb
const db = DBSCHEMA + '://' + DBHOST + '/' + DBNAME
mongoose.connect(db, { useNewUrlParser: true })

// Require API routes
const api = require('./api')

// to let post request body works
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))


app.use(cors())
app.use('/api', api)

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});
