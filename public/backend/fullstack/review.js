const AccountDB = require("../src/review.js")

class Review{

    //test constructor
    constructor( review_email, feedback, stars){
        this.reviewer_email = review_email;
        this.feedback = feedback;
        this.stars = stars;
    }
}

module.exports = Review;