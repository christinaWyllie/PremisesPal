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

    /*
     * Inserts new post into job_posting table
     * Requires: description, dateOfPosting, status, price, requiredSkills, poster_email
     * poster_email must be a valid ACCOUNT && poster
     * Will also insert poster_email into poster table.
     */
    static async createPost( title, description, dateOfPosting, status, price, requiredSkills, poster_email ) {
        if(!PostDB.connection) await PostDB.makeConnection()
        console.log(`Creating from poster: ${poster_email}`)

        const newPoster = await PostDB.query(`INSERT INTO poster(email) 
                                            SELECT '${poster_email}'
                                            WHERE NOT EXISTS (SELECT 1 FROM poster WHERE email = '${poster_email}');`)

        const createPost = await PostDB.query(`INSERT INTO JOB_POSTING(title, description, dateOfPosting, status, price, requiredSkills, poster_email) VALUES ` + 
        `('${title}', '${description}', '${dateOfPosting}', '${status}', ${price}, '${requiredSkills}', '${poster_email}')`) 
        
        return(newPoster.protocol41 && createPost.protocol41)
    }

    /*
     * Deletes existing post from job_posting table
     * Requires: post_id
     */
    static async deletePost(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        console.log(`Deleting post: ${id}`)

        const deletedPost = await PostDB.query(`DELETE FROM JOB_POSTING WHERE post_id = ('${id}')`)

        return(deletedPost.protocol41)

    }

    /*
     * Retrieves post ids from existing email from job_posting table
     * Requires: poster_email
     */
    static async getPostsFromEmail(poster_email) {
        if(!PostDB.connection) await PostDB.makeConnection()

        const listIDs = await PostDB.query(`SELECT post_id FROM JOB_POSTING WHERE poster_email = ('${poster_email}')`)
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

        const postInfoStored = await PostDB.query(`SELECT * FROM JOB_POSTING WHERE post_id = ('${id}')`)
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

        const newContractor = await PostDB.query(`UPDATE JOB_POSTING SET contractor_email = ('${contractor_email}') WHERE post_id = '${id}'`)
        return(newContractor.protocol41)
    }

    /*
     * Sets the post status of an existing post to Inactive in the job_posting table
     * Requires: post_id
     */
    static async setPostInactive(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        const inactive = await PostDB.query(`UPDATE JOB_POSTING SET status = 'Inactive' WHERE post_id = '${id}'`)
        return(inactive.protocol41)
    }

     /*
     * Sets the post status of an existing post to Active in the job_posting table
     * Requires: post_id
     */
    static async setPostActive(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        const active = await PostDB.query(`UPDATE JOB_POSTING SET status = 'Active' WHERE post_id = '${id}'`)
        return(active.protocol41)
    }

     /*
     * Sets the post status of an existing post to In Progress in the job_posting table
     * Requires: post_id
     */
    static async setPostInProgress(id){
        if(!PostDB.connection) await PostDB.makeConnection()

        const progress = await Post.query(`UPDATE JOB_POSTING SET status = 'In Progress' WHERE post_id = '${id}'`)
        return(progress.protocol41)
    }

     /*
     * Updates the price of an existing post in the job_posting table
     * Requires: post_id, newPrice
     */
    static async updatePrice(id, newPrice){
        if(!PostDB.connection) await PostDB.makeConnection()

        const price = await PostDB.query(`UPDATE JOB_POSTING SET price = ('${newPrice}') WHERE post_id = '${id}'`)
        return(price.protocol41)
    }

    /*
     * Updates the description of an existing post in the job_posting table
     * Requires: post_id, newDescription
     */
    static async updateDescription(id, newDescription){
        if(!PostDB.connection) await PostDB.makeConnection()

        const description = await PostDB.query(`UPDATE JOB_POSTING SET description = ('${newDescription}') WHERE post_id = '${id}'`)
        return(description.protocol41)
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

