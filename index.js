const express = require('express')
const db = require('./database.js')
// const mysql = require('mysql')
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3006

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


// const con = mysql.createConnection({
//   host: DBHOST,
// 	port: DBPORT,
//   user: DBUSER,
//   password: DBPASS,
// 	database: DBNAME
// })

// con.connect((err) => {
	// if (err) throw err

	// console.log('DB connected: ✓')
app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
	
});

// })
