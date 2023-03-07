//Grab mysql libraries
const mysql = require('mysql');

class Login{

    // == Abstracted query function that runs synchronously using promises ==
    static async query( query ) {

        // -- Database connection --
        const connection = mysql.createConnection({   // <== connection is used to establish connection with database
            host: 'localhost',
            user: 'seng401',
            password: 'pal', 
            database: 'PremisesPal'
        })
        
        connection.connect(function(err) {
            if(err) {
                return console.error('Unable to connect to database' + err.message);
            }
            console.log('Connection created successfully!');
        });
        // -------------------------

        return new Promise(( resolve,reject )=>{
            console.log(`Running query: ${query}`)

            connection.query( query, function(err,results,fields) {
                if ( err ) reject( err ) // rejections are for query errors, network and other failures
                else resolve( results,fields ) // resolve with query results
            })    
        })
    }
    // ======================================================================

    // Ensures username is present in ACCOUNT table
    static async validateUsername( user ) {
        console.log(`validateUsername: Validating ${user}`)
        const existingUsers = await Login.query(`SELECT email FROM ACCOUNT WHERE email ='${user}'`)
        console.log('validateUsername: Found existing users', existingUsers)
        return (existingUsers && existingUsers.length)  // existingUsers is defined and nonzero
    }

    // Ensures pass corresponds to given user in ACCOUNT table
    static async validatePassword( user, pass ) {
        console.log(`validatePassword: validating ${pass} for ${user}`)
        const existingUsers = await Login.query(`SELECT email, pass FROM ACCOUNT WHERE email ='${user}'`)
        console.log('validatePassword: Found existing users', existingUsers)
        return (existingUsers && existingUsers.length && existingUsers[0].pass === pass) // existingUsers is defined, nonzero, and pass matches
    }
}

/**
 * UNCOMMENT BELOW TO TEST FUNCTIONALITY. RUN WITH 'node login.js'
 * A basic demonstration of how to interact with this class, for Jack & Brenek
 */

// async function mockLoginFunction() {
//     console.log("\nMocking login functionality:")
//     var username = await Login.validateUsername('arion@yahoo.ca')   // <= username to be validated
//     console.log(`validateUsername returned: ${username}`)

//     if(username == true) {
//         console.log("! Email is registered\n")

//         var password = await Login.validatePassword('arion@yahoo.ca', 'password')   // <= username and associated password to be validated
//         console.log(`validatePassword returned: ${password}`)

//         if(password == true) console.log("! Login successful\n")
//         else console.log("! Password is incorrect\n")

//     } else console.log("! Email is not registered\n")
// }

// mockLoginFunction()