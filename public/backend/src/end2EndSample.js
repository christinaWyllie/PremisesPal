/**
 * A simple example of an end to end webservice running with express and mysql locally
 */

//const mysql = require('mysql');

// middleware class for business logic
class Middleware {

  constructor() {

    /**
     * 
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'me',
      password : 'secret',
      database : 'my_db'
    });
     
    this.connection.connect()

    **/
  
  }

  // delegates to database, returns a Promise to allow caller to await results
  static query( query ) {

    return new Promise((resolve,reject)=>{

      /** 
      TODO - issue query and resolve or reject based on response
      this.connection.query( query, function(err,results,fields) {
        if ( err ) reject(err) // rejections are for query errors, network and other failures
        else resolve(results,fields) // resolve with query results
      })
      **/

      // for now fake a response 
      setTimeout( ()=>{
        resolve( [{ email: 'john@home.com', pswd: 'abcd' }] ) 
      }, 1000 )

    })
  }

  // login business logic - find a matching user and verify their password
  static async login( email, pswd ) {
    const existingUsers = await Middleware.query(`SELECT EMAIL, PSWD FROM ACCOUNT WHERE EMAIL='${email}'`)
    console.log('found existing users', existingUsers)
    return (existingUsers && existingUsers.length && existingUsers[0].pswd === pswd)
  }

  // business logic for registering a new user
  static async register( email, pswd ) {
    throw new Error('not implemented')
  }

}

/**
 * webserver definition with routes for /register and /login
   Test using http://localhost:5150/login?email=john@home.com&pswd=abcd
 */
const express = require('express')
const app = express()
const port = 5150

// register route definition 
app.post(
  '/register', 
  async (req, res) => {
    try {
      const user = await Middleware.register({ email:req.body.email, pswd: req.body.pswd } ) 
      if ( user ) res.send('Registration succeeded')
      else res.send('Registration failed')
    } catch( err ) {
      res.send(`We're having trouble at the moment`)
    }
  }
)

// login route definition 
app.get(
  '/login', 
  async (req, res) => {

    // busines logic to test login 
    console.log('/login with query',req.query)
    const exists = await Middleware.login( req.query.email, req.query.pswd ) 
    console.log('Middleware.login returned', exists)

    // todo - setup session 

    // response back to browser 
    if ( exists ) res.send('Login succeeded')
    else res.send('Login failed')

  }
)

// start the webserver 
app.listen(port, () => {
  console.log(`listening on port ${port}\nOpen a browser to: http://localhost:5150/login?email=john@home.com&pswd=abcd\n`)
})