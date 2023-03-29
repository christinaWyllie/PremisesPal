class ContractorDB{

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
    static async query( query, values ) {
        return new Promise(( resolve,reject )=>{
            console.log(`Running query: ${query}`)
            this.connection.query( query, values, function(err,results,fields) {
                if ( err ) reject( err ) // rejections are for query errors, network and other failures
                else resolve( results,fields ) // resolve with query results
            })    
        })
    }
    // ================================ END ======================================

    /**
     * Adds a new contractor into the contractor table, if email does not already exist
     */
    static async addContractor(email, biography) {
        if(!ContractorDB.connection) await ContractorDB.makeConnection()

        const query = 'INSERT INTO contractor SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM contractor WHERE email = ?)'
        const newContractor = await ContractorDB.query(query, [email, biography, email])

        return(newContractor.protocol41)
    }

    static async addReference(email, reference) {
        if(!ContractorDB.connection) await ContractorDB.makeConnection()

        const query = 'INSERT INTO contractor_references VALUES (?, ?)'
        const newReference = await ContractorDB.query(query, [email, reference])

        return(newReference.protocol41)
    }

    static async addSkill(email, skill) {
        if(!ContractorDB.connection) await ContractorDB.makeConnection()

        const query = 'INSERT INTO contractor_specialties VALUES (?, ?)'
        const newSkill = await ContractorDB.query(query, [email, skill])

        return(newSkill.protocol41)
    }

    static async viewReferences(email) {
        if(!ContractorDB.connection) await ContractorDB.makeConnection()

        const query = 'SELECT * FROM contractor_references WHERE email = ?'
        const references = await ContractorDB.query(query, [email])

        var allReferences = []

        for(let i = 0; i < references.length; i++) {
            allReferences.push(references[i].ref)
        }

        return(allReferences)
    }

    static async viewSkills(email) {
        if(!ContractorDB.connection) await ContractorDB.makeConnection()

        const query = 'SELECT * FROM contractor_specialties WHERE email = ?'
        const skills = await ContractorDB.query(query, [email])

        var allSkills = []

        for(let i = 0; i < skills.length; i++) {
            allSkills.push(skills[i].skills)
        }

        return(allSkills)
    }

}

module.exports = ContractorDB