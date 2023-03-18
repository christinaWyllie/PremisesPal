class DBConnection{  
    // Copy the following:  

    // =============================== START =====================================
    static mysql = require('mysql');  //Grab mysql libraries
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

    static async registerUser(username, password){
        console.log(`Connection status: ${Login.connection}`)
        if (!Login.connection) await Account.makeConnection();  //Establish database connection if not already made
        console.log(`validateUsername: Validating ${user}`)

        const insertUser = await Account.query(`INSERT INTO ACCOUNT VALUES ('${username}', '${password}')`)

        return (insertUser.protocol41)  // returns true if insert is successful
    }
    // ================================ END ======================================
    
    // login business logic - find a matching user and verify their password
    static async testLogin( email, pswd ) {
        console.log(`Querying for ${email} ${pswd}`)
        if(!DBConnection.connection) await DBConnection.makeConnection()

        const existingUsers = await DBConnection.query(`SELECT email, pass FROM ACCOUNT WHERE email ='${email}'`)
        console.log('Found existing users', existingUsers)
        return (existingUsers && existingUsers.length && existingUsers[0].pass === pswd)
    }

    static async testInsert( email, pass ) {
        if(!DBConnection.connection) await DBConnection.makeConnection()
        console.log(`Testing insertion of ${email}`)

        const insertUser = await DBConnection.query(`INSERT INTO ACCOUNT VALUES ('${email}', '${pass}')`)
        return (insertUser.protocol41)  //protocol41 returns state of query i.e true
    }
}

async function testExists() {
    // busines logic to test login 
    console.log('/login with query')
    const exists = await DBConnection.testLogin( 'arion@yahoo.ca', 'passwrd') 
    console.log('DBConnection.login returned', exists)
}

async function testInsert() {
    console.log("Testing an insertion query")
    const insert = await DBConnection.testInsert('test2@gmail.ca', 'test2Password')
    console.log('DBConnection.testInsert retured', insert)
}

testInsert()


