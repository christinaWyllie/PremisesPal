/**
 * Microservice responsible for post functionalities
 * For example: creating, removing, accepting, updating posts
 */

class PostDB{

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
    static async query( query , values ) {
        return new Promise(( resolve,reject )=>{
            console.log(`Running query: ${query}`)
            this.connection.query( query, values,  function(err,results,fields) {
                if ( err ) reject( err ) // rejections are for query errors, network and other failures
                else resolve( results,fields ) // resolve with query results
            })    
        })
    }
    // ================================ END ======================================


    /*
    * Create a new poster and add it to the poster table in the database
    */
    static async addPoster(poster_email ) {
        if (!PostDB.connection) await PostDB.makeConnection();
        const query = 'SELECT 1 FROM account WHERE email = ?'
        const result = await PostDB.query(query, [poster_email]);
        if (result.length <= 0) {
            console.log("failed, account doesn't exist in database.");
            return false;
        }

        const query2 = 'INSERT INTO poster(email) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM poster WHERE email = ?);'

        const newPoster = await PostDB.query(query2, [poster_email,poster_email])
        
        return(newPoster.protocol41)
    }

    /*
     * Inserts new post into job_posting table
     * Requires: description, dateOfPosting, status, price, requiredSkills, poster_email
     * poster_email must be a valid ACCOUNT && poster
     * Will also insert poster_email into poster table.
     */
    static async createPost( title, description, dateOfPosting, status, price, requiredSkills, poster_email ) {
        if (!PostDB.connection) await PostDB.makeConnection()
        const query = 'SELECT 1 FROM account WHERE email = ?'
        const result = await PostDB.query(query, [poster_email])
        if (result.length <= 0) {
            console.log("failed, account doesn't exist in database.");
            return false;
        }

        const query2 = 'INSERT INTO poster(email) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM poster WHERE email = ?);'
        const newPoster = await PostDB.query(query2, [poster_email, poster_email])

        const query3 = 'INSERT INTO JOB_POSTING(title, description, dateOfPosting, status, price, requiredSkills, poster_email) VALUES (?,?,?,?,?,?,?)'
        const createPost = await PostDB.query(query3, [title, description, dateOfPosting, status, price, requiredSkills, poster_email]) 
        
        return(newPoster.protocol41 && createPost.protocol41)
    }

    /*
     * Deletes existing post from job_posting table
     * Requires: post_id
     */
    static async deletePost(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        console.log(`Deleting post: ${id}`)

        const query = 'DELETE FROM JOB_POSTING WHERE post_id = ?'
        const deletedPost = await PostDB.query(query, [id])

        return(deletedPost.protocol41)

    }

    /*
     * Retrieves post ids from existing email from job_posting table
     * Requires: poster_email
     */
    static async getPostsFromEmail(poster_email) {
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'SELECT post_id FROM JOB_POSTING WHERE poster_email = ?'
        const listIDs = await PostDB.query(query, [poster_email])
        console.log("lidsIDs: ", listIDs)
        var listOfIDs = []
        for(let i = 0; i< listIDs.length; i++){
            listOfIDs.push(listIDs[i].post_id)
        }
        return(listOfIDs)
    }

    /*
     * Retrieves all information for an existing post_id from job_posting table
     * Requires: post_id
     */
    static async getPostFromID(id) {
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'SELECT * FROM JOB_POSTING WHERE post_id = ?'
        const postInfoStored = await PostDB.query(query, [id])
        var postInfo = []
        if(postInfoStored.length == 0){
            return postInfo
        }
        var postInfo = []
        console.log(postInfoStored)
        postInfo.push(postInfoStored[0].post_id)
        postInfo.push(postInfoStored[0].title)
        postInfo.push(postInfoStored[0].description)
        postInfo.push(postInfoStored[0].dateOfPosting)
        postInfo.push(postInfoStored[0].status)
        postInfo.push(postInfoStored[0].price)
        postInfo.push(postInfoStored[0].requiredSkills)
        postInfo.push(postInfoStored[0].poster_email)
        postInfo.push(postInfoStored[0].contractor_email)
        return(postInfo)
    }

    /*
     * Assigns a contractor to an existing post to job_posting table
     * Requires: post_id, contractor_email
     */
    static async assignContractor(id, contractor_email){
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'UPDATE JOB_POSTING SET contractor_email = ? WHERE post_id = ?'
        const newContractor = await PostDB.query(query, [contractor_email, id])
        return(newContractor.protocol41)
    }

    /*
     * Sets the post status of an existing post to Inactive in the job_posting table
     * Requires: post_id
     */
    static async setPostInactive(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'UPDATE JOB_POSTING SET status = \'Inactive\' WHERE post_id = ?'
        const inactive = await PostDB.query(query, [id])
        return(inactive.protocol41)
    }

     /*
     * Sets the post status of an existing post to Active in the job_posting table
     * Requires: post_id
     */
    static async setPostActive(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'UPDATE JOB_POSTING SET status = \'Active\' WHERE post_id = ?'
        const active = await PostDB.query(query, [id])
        return(active.protocol41)
    }

     /*
     * Sets the post status of an existing post to In Progress in the job_posting table
     * Requires: post_id
     */
    static async setPostInProgress(id){
        if(!PostDB.connection) await PostDB.makeConnection()
        
        const query = 'UPDATE JOB_POSTING SET status = \'In Progress\' WHERE post_id = ?'
        const progress = await PostDB.query(query, [id])
        return(progress.protocol41)
    }

    static async getPostsBySkills(skills) {
        if(!PostDB.connection) await PostDB.makeConnection()

        var posts = []
        for(let i = 0; i < skills.length; i++) {
            const query = 'SELECT * FROM job_posting WHERE requiredSkills = ?'
            var result = await PostDB.query(query, [skills[i]])

            for(let j = 0; j < result.length; j++) {
                posts.push(result[j])
            }
        }

        return posts
    }

     /*
     * Updates the price of an existing post in the job_posting table
     * Requires: post_id, newPrice
     */
    static async updatePrice(id, newPrice){
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'UPDATE JOB_POSTING SET price = ? WHERE post_id = ?'
        const price = await PostDB.query(query, [newPrice, id])
        return(price.protocol41)
    }

    /*
     * Updates the description of an existing post in the job_posting table
     * Requires: post_id, newDescription
     */
    static async updateDescription(id, newDescription){
        if(!PostDB.connection) await PostDB.makeConnection()

        const query = 'UPDATE JOB_POSTING SET description = ? WHERE post_id = ?'
        const description = await PostDB.query(query, [newDescription, id])
        return(description.protocol41)
    }

    //close the connection 
    static async closeConnection(){
        await PostDB.connection.end()
    }
}

module.exports = PostDB

//add something for getting all posts with null contractor

// async function mockCreatePostFunction() {
//     // console.log("\nMocking login functionality:")
//     // var newPost = await Post.createPost('Testing new post', '2023-03-05', 'Active', 493.03, 'Plumetry', 'test@gmail.com')   // <= username to be validated
//     // console.log("createPost returned", newPost)

//     var newContractor = await PostDB.deletePost(6)
//     console.log(newContractor)
// }

// async function mockGetIDFunction() {
//     console.log("\nMocking getID functionality:")
//     var username = await PostDB.getPostFromID(20)   // <= username to be validated
//     console.log("registerUser returned: ", username)
// }

// mockGetIDFunction()
