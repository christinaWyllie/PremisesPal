class Contractor{

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
    // ================================ END ======================================

    /**
     * Adds a new contractor into the contractor table, if email does not already exist
     */
    static async addContractor(email, biography) {
        if(!Contractor.connection) await Contractor.makeConnection()

        const newContractor = await Contractor.query(`INSERT INTO contractor VALUES ('${email}', '${biography}')`)

        return(newContractor.protocol41)
    }

    static async addReference(email, reference) {
        if(!Contractor.connection) await Contractor.makeConnection()

        const newReference = await Contractor.query(`INSERT INTO contractor_references VALUES ('${email}', '${reference}')`)

        return(newReference.protocol41)
    }

    static async addSkill(email, skill) {
        if(!Contractor.connection) await Contractor.makeConnection()

        const newSkill = await Contractor.query(`INSERT INTO contractor_specialties VALUES ('${email}', '${skill}')`)

        return(newSkill.protocol41)
    }

    static async viewReferences(email) {
        if(!Contractor.connection) await Contractor.makeConnection()

        const references = await Contractor.query(`SELECT * FROM contractor_references WHERE email = '${email}'`)

        var allReferences = []

        for(let i = 0; i < references.length; i++) {
            allReferences.push(references[i].ref)
        }

        return(allReferences)
    }

    static async viewSkills(email) {
        if(!Contractor.connection) await Contractor.makeConnection()

        const skills = await Contractor.query(`SELECT * FROM contractor_specialties WHERE email = '${email}'`)

        var allSkills = []

        for(let i = 0; i < skills.length; i++) {
            allSkills.push(skills[i].skills)
        }

        return(allSkills)
    }

}

async function mockAddContractor() {
    console.log("\nMocking new contractor functionlity:")
    var newContractor = await Contractor.viewSkills('test@gmail.ca')   // <= username to be validated
    console.log("createPost returned", newContractor)
}

mockAddContractor()