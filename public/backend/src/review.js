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
    
    /*
     * creates a new job review
     * Requires: post_id, reviewer_email, reviewee_email, feedback, jobType, stars
     */
    static async createReview(reviewer_email, reviewee_email, feedback, jobType, stars){
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        console.log(`Creating Review`)

        let today = new Date().toISOString().slice(0, 10)

        
        const query = `INSERT INTO REVIEW (reviewer_email, reviewee_email, date, feedback, job_type, stars) VALUES (?, ?, ?, ?, ?, ?)`
        const createdReview = await ReviewDB.query(query, [reviewer_email, reviewee_email, today, feedback, jobType, stars])

        return(createdReview.protocol41)

    }


    static async viewReview(id) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const query = `SELECT * FROM REVIEW WHERE reviewID = ?`
        const result = await ReviewDB.query(query, [id]);

        if(result.length == 0) {
            console.log("! No reviews found");
            return result;
        }

        console.log("! Result", result[0]);
        return result[0];
    }

    /*
     * view reviews by the reviewer email and the reviewee email
     * Requires: reviewer email, reviewee email
     */
    static async viewReviewByEmails(reviewer_email, reviewee_email) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const query = `SELECT * FROM REVIEW WHERE reviewer_email = ? AND reviewee_email = ?`
        const result = await ReviewDB.query(query, [reviewer_email, reviewee_email]);

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
    /*
     * view reviews by only the reviewee email
     * Requires: reviewee email
     */
    static async viewReviewByEmail(reviewee_email) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const query = `SELECT * FROM REVIEW WHERE reviewee_email = ?`
        const result = await ReviewDB.query(query, [reviewee_email]);

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

    /*
     * Updates the review feedback, job type and stars of an existing review
     * Requires: post_id, newFeedback, newJobType and newStars
     */
    static async updateReview(id, newFeedback, newJobType, newStars) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const query = `UPDATE REVIEW SET feedback = ?, job_type = ?, stars = ? WHERE reviewID = ?`
        const result = await ReviewDB.query(query, [newFeedback, newJobType, newStars, id]);

        console.log("! Result changed", result.changedRows);
        return result.changedRows;
    }

    /*
     * deletes an existing review
     * Requires: post_id
     */
    static async deleteReview(id) {
        if(!ReviewDB.connection) await ReviewDB.makeConnection()

        const query = `DELETE FROM REVIEW WHERE reviewID = ?`
        const result = await ReviewDB.query(query, [id]);

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

