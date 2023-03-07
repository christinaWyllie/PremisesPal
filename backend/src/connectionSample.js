//create a connection to MYSQL
const mysql = require('mysql');

class DBConnection{    
    connection;

    // Establishes database connection upon new instance creation
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'seng401',
            password: 'pal', 
            database: 'PremisesPal'
        })
        
        this.connection.connect(function(err) {
            if(err) {
                return console.error('Unable to connect to database' + err.message);
            }
            console.log('Connection created successfully!');
        });
    }

    // Abstracted query function that runs synchronously using promises
    async query( query ) {
        return new Promise((resolve,reject)=>{
            this.connection.query( query, function(err,results,fields) {
                if ( err ) reject(err) // rejections are for query errors, network and other failures
                else resolve(results,fields) // resolve with query results
            })    
        })
    }
    
    // login business logic - find a matching user and verify their password
    async login( email, pswd ) {
        const existingUsers = await this.query(`SELECT email, pass FROM ACCOUNT WHERE email ='${email}'`)
        console.log('Found existing users', existingUsers)
        return (existingUsers && existingUsers.length && existingUsers[0].pass === pswd)
    }
}

console.log("Testing login query")

async function testExists() {

    var testDBConnection = new DBConnection();

    // busines logic to test login 
    console.log('/login with query')
    const exists = await testDBConnection.login( 'arion@yahoo.ca', 'passwrd') 
    console.log('DBConnection.login returned', exists)
}

testExists()


