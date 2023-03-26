const ReviewDB = require('../review.js')

//testing the createPost method for when the email is not in the poster table yet
//TC29
test('testing creating a review with valid emails', async () => {
    const result = await ReviewDB.createReview('testPoster@hotmail.com', 'testDeleting@gmail.com', 'Great work', 'Welding', 5)
    expect(result).toBe(true)
});


//testing the viewReview function with a post id
//TC30
test('testing viewing a review with valid id', async () => {
    const result = await ReviewDB.viewReview(1)
    expect(result.reviewee_email).toEqual('testContractor@yahoo.ca')
});


//testing the viewReviewByEmails() with valid emails
//TC31
test('testing viewing a review with valid emails', async () => {
    const result = await ReviewDB.viewReviewByEmails('testPoster@hotmail.com', 'testContractor@yahoo.ca')
    expect(result[0].reviewID).toEqual(1)
});

//testing the updateReview() method with new valid information
//TC32
test('testing updating an existing review', async () => {
    const result = await ReviewDB.updateReview(1, "New feedback", "New job", 3)
    expect(result).toEqual(1)
});

//testing the viewReviewByEmail() with a valid email
//TC33
test('testing viewing a review with a valid email', async () => {
    const result = await ReviewDB.viewReviewByEmail('testContractor@yahoo.ca')
    expect(result[0].reviewID).toEqual(1)
});


//testing the deleteReview()
//TC34
test('testing deleting an existing review', async () => {
    const result = await ReviewDB.deleteReview(1)
    await ReviewDB.closeConnection()
    expect(result).toEqual(1)
});



