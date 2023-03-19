class AccountDB{

    // =============================== START =====================================
    static mysql = require('mysql')  //Grab mysql libraries
    static connection   //Static connection variable used for database interactivity
    
    // Establishes connection with database - must be called atleast once
    static async makeConnection() {
        console.log("Making connection")
        this.connection = this.mysql.createConnection({   // <== connection is used to establish connection with database
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
    static async query( query ) {
        return new Promise(( resolve,reject )=>{
            console.log(`Running query: ${query}`)
            this.connection.query( query, function(err,results,fields) {
                if ( err ) reject( err ) // rejections are for query errors, network and other failures
                else resolve( results,fields ) // resolve with query results
            })    
        })
    }
    // ================================ END ======================================

    // ====== Functions specific to login.js ======

    // Ensures username is present in ACCOUNT table
    static async validateUsername( user ) {
        //console.log(`Connection status: ${AccountDB.connection}`)
        if (!AccountDB.connection) await AccountDB.makeConnection();  //Establish database connection if not already made
        console.log(`validateUsername: Validating ${user}`)

        const existingUsers = await AccountDB.query(`SELECT email FROM ACCOUNT WHERE email ='${user}'`)

        if (existingUsers && existingUsers.length > 0) {
            console.log('validateUsername: Found existing users', existingUsers);
            return true;
        }
        console.log("found no users.");
        return false;
    }

    // Ensures pass corresponds to given user in ACCOUNT table
    static async validatePassword( user, pass ) {
        console.log(`Connection status: ${AccountDB.connection}`)
        if (!AccountDB.connection) await AccountDB.makeConnection();  //Establish database connection if not already made
        console.log(`validatePassword: validating ${pass} for ${user}`)

        const existingUsers = await AccountDB.query(`SELECT email, pass FROM ACCOUNT WHERE email ='${user}'`)
        if (existingUsers.length === 0) {
            console.log("found no users.");
            return false;
        }
        console.log('validatePassword: Found existing users', existingUsers)
        return (existingUsers && existingUsers.length && existingUsers[0].pass === pass) // existingUsers is defined, nonzero, and pass matches
    }

    //function to create a new account
    static async registerUser(username, password){
        console.log(`Connection status: ${AccountDB.connection}`)
        if (!AccountDB.connection) await AccountDB.makeConnection();  //Establish database connection if not already made
        console.log(`validateUsername: Validating ${username}`)

        const insertUser = await AccountDB.query(`INSERT INTO ACCOUNT VALUES ('${username}', '${password}')`)

        return (insertUser.protocol41)  // returns true if insert is successful
    }
}

module.exports = AccountDB