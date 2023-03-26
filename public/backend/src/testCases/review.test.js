const ReviewDB = require('../review.js')

//testing the createPost method for when the email is not in the poster table yet
test('testing creating a review with valid emails', async () => {
    const result = await ReviewDB.createReview('testPoster@hotmail.com', 'testDeleting@gmail.com', 'Great work', 'Welding', 5)
    expect(result).toBe(true)
});


//testing the viewReview function with a post id
test('testing viewing a review with valid id', async () => {
    const result = await ReviewDB.viewReview(1)
    expect(result.reviewee_email).toEqual('testContractor@yahoo.ca')
});


//testing the viewReviewByEmails()
test('testing viewing a review with valid emails', async () => {
    const result = await ReviewDB.viewReviewByEmails('testPoster@hotmail.com', 'testContractor@yahoo.ca')
    expect(result[0].reviewID).toEqual(1)
});

//testing the viewReviewByEmails()
test('testing updating an existing review', async () => {
    const result = await ReviewDB.updateReview(1, "New feedback", "New job", 3)
    expect(result).toEqual(1)
});

//testing the viewReviewByEmail()
test('testing viewing a review with a valid email', async () => {
    const result = await ReviewDB.viewReviewByEmail('testContractor@yahoo.ca')
    expect(result[0].reviewID).toEqual(1)
});


//testing the viewReviewByEmails()
test('testing deleting an existing review', async () => {
    const result = await ReviewDB.deleteReview(1)
    await ReviewDB.closeConnection()
    expect(result).toEqual(1)
});



