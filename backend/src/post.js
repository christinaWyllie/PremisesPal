/**
 * Microservice responsible for post functionalities
 * For example: creating, removing, accepting, updating posts
 */

class Post{

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
     * Inserts new post into job_posting table
     * Requires: post_id, description, dateOfPosting, status, price, requiredSkills, poster_email
     * post_id must be unique
     * poster_email must be a valid ACCOUNT && poster
     * Will also insert poster_email into poster table.
     */

    //Might... not.. need to be async? Idk we'll find out.
    static async createPost( description, dateOfPosting, status, price, requiredSkills, poster_email ) {
        if(!Post.connection) await Post.makeConnection()

        console.log(`Creating from poster: ${poster_email}`)

        const newPoster = await Post.query(`INSERT INTO POSTER VALUES ('${poster_email}')`)

        const createPost = await Post.query(`INSERT INTO JOB_POSTING(description, dateOfPosting, status, price, requiredSkills, poster_email) VALUES ` + 
        `('${description}', '${dateOfPosting}', '${status}', ${price}, '${requiredSkills}', '${poster_email}')`) 
        
        return(newPoster.protocol41 && createPost.protocol41)
    }
}

async function mockCreatePostFunction() {
    console.log("\nMocking login functionality:")
    var newPost = await Post.createPost('Testing new post', '2023-03-05', 'Active', 493.03, 'Plumetry', 'test@gmail.ca')   // <= username to be validated
    console.log("createPost returned", newPost)
}

mockCreatePostFunction()

