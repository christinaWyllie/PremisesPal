const AccountDB = require("../src/review.js")

class Review{

    constructor(reviewerEmail, revieweeEmail, feedback, jobType, stars) {
        this.reviewerEmail = reviewerEmail;
        this.revieweeEmail = revieweeEmail;
        this.feedback = feedback;
        this.jobType = jobType;
        this.stars = stars;
    }
}

module.exports = Review;