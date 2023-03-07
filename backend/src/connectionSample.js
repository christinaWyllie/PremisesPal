//Grab mysql libraries
const mysql = require('mysql');

class DBConnection{    
    
    // COPY THIS INTO EACH MICROSERVICE
    // == Abstracted query function that runs synchronously using promises ==
    static async query( query ) {

        // -- Database connection --
        var connection = mysql.createConnection({   // <== connection is used to establish connection with database
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
    
    // login business logic - find a matching user and verify their password
    static async login( email, pswd ) {
        console.log(`Querying for ${email} ${pswd}`)
        const existingUsers = await DBConnection.query(`SELECT email, pass FROM ACCOUNT WHERE email ='${email}'`)
        console.log('Found existing users', existingUsers)

        return (existingUsers && existingUsers.length && existingUsers[0].pass === pswd)
    }
}

async function testExists() {
    // busines logic to test login 
    console.log('/login with query')
    const exists = await DBConnection.login( 'arion@yahoo.ca', 'passwrd') 
    console.log('DBConnection.login returned', exists)
}

testExists()


