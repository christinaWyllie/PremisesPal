const AccountDB = require("../src/review.js")

class Review{

    constructor(id, reviewerEmail, revieweeEmail, feedback, jobType, stars) {
        this.id = id;
        this.reviewerEmail = reviewerEmail;
        this.revieweeEmail = revieweeEmail;
        this.feedback = feedback;
        this.jobType = jobType;
        this.stars = stars;
    }
}

module.exports = Review;