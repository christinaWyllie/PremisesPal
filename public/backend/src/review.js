class ReviewDB {

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
     * Deletes existing post from job_posting table
     * Requires: post_id
     */
    static async createReview(id, reviewer_email, reviewee_email, feedback, jobType, stars){
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        console.log(`Creating Review: ${id}`)

        let today = new Date().toISOString().slice(0, 10)

        

        const createdReview = await ReviewDB.query(`INSERT INTO REVIEW 
                                                    SELECT ${id}, '${reviewer_email}', '${reviewee_email}', '${today}', '${feedback}', '${jobType}', ${stars}
                                                    WHERE NOT EXISTS (SELECT 1 FROM REVIEW WHERE job_id = '${id}')`);

        return(createdReview.protocol41)

    }

    static async viewReview(id) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const result = await ReviewDB.query(`SELECT * FROM REVIEW WHERE job_id = '${id}'`);

        if(result.length == 0) {
            console.log("! No reviews found");
            return result;
        }

        console.log("! Result", result[0]);
        return result[0];
    }

    static async viewReviewByEmails(reviewer_email, reviewee_email) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const result = await ReviewDB.query(`SELECT * FROM REVIEW WHERE reviewer_email = '${reviewer_email}' AND reviewee_email = '${reviewee_email}'`);

        if(result.length == 0) {
            console.log("! No reviews found");
            return result;
        }

        var reviews = [];

        for(let i = 0; i < result.length; i++) {
            reviews.push(result[i])
        }

        console.log("! Result", reviews);
        return reviews;
    } 

    static async updateReview(id, newFeedback, newJobType, newStars) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const result = await ReviewDB.query(`UPDATE REVIEW 
                                            SET feedback = '${newFeedback}', job_type = '${newJobType}', stars = '${newStars}'`);

        console.log("! Result changed", result.changedRows);
        return result.changedRows;
    }

    static async deleteReview(id) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const result = await ReviewDB.query(`DELETE FROM REVIEW WHERE job_id = '${id}'`);

        console.log("! Result affected", result.affectedRows);
        return result.affectedRows;
    }

    static async closeConnection() {
        await this.connection.end()
    }
}

module.exports = ReviewDB

// async function mockLoginFunction() {
//     console.log("\nMocking register functionality:")
//     var username = await ReviewDB.createReview(2, 'testPoster@hotmail.com',  'testDeleting@gmail.com','good','paint', 4) 
//     console.log(`registerUser returned: ${username}`)
// }

// mockLoginFunction()
