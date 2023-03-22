const ReviewDB = require('../review.js')

//testing the createPost method for when the email is not in the poster table yet
test('testing creating a review with valid emails', async () => {
    const result = await ReviewDB.createReview(2, 'testPoster@hotmail.com', 'testDeleting@gmail.com', 'Great work', 'Welding', 5)
    expect(result).toBe(true)
});


//testing the viewReview function with a post id
test('testing viewing a review with valid id', async () => {
    const result = await ReviewDB.viewReview(1)
    expect(result.reviewee_email).toEqual('testContractor@yahoo.ca')
});


//testing the viewReviewByEmails()
test('testing viewing a review with valid id', async () => {
    const result = await ReviewDB.viewReviewByEmails('testPoster@hotmail.com', 'testContractor@yahoo.ca')
    await ReviewDB.closeConnection()
    expect(result[0].job_id).toEqual(1)
});

