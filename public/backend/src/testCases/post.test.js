const { setPostInProgress } = require('../post.js');
const PostDB = require('../post.js')

//testing the createPost method for when the email is not in the poster table yet
//TC12
test('Testing creating a post when poster does not yet exist in Poster Table', async () => {
    const result = await PostDB.createPost('adding', 'description', '2023-03-19', 
                    'active', 400, 'painting', 'testAdding@gmail.com')
    expect(result).toBe(true)
});

//testing the createPost method for when the email is in the poster table
test('Testing creating a post when poster exists in Poster Table', async () => {
    const result = await PostDB.createPost('adding', 'description', '2023-03-19', 
                    'active', 400, 'painting', 'testPostings@shaw.ca')
    expect(result).toBe(true)
});

//testing the deletePost() method when the id exists in the table
test('Testing deleting a post when post_id exists in Job_Posting Table', async () => {
    const result = await PostDB.deletePost(4)
    expect(result).toBe(true)
});

//testing the deletePost() method when the id does not exists in the table
test('Testing deleting a post when post_id does not exist in Job_Posting Table', async () => {
    const result = await PostDB.deletePost(20)
    expect(result).toBe(true)
});


//testing the getPostsFromEmail() method when the poster email exists with posts
test('Testing getting a posters post ids from their email when posts exists for them',async () => {
    const result = await PostDB.getPostsFromEmail('testPoster@hotmail.com')
    expect(result).toEqual([1, 2, 3, 5])
});

//testing the getPostsFromEmail() method when the poster email exists with no posts
test('Testing getting a posters post ids from their email when posts do not exist for them',async () => {
    const result = await PostDB.getPostsFromEmail('testEmpty@hotmail.com')
    expect(result).toEqual([])
});

//testing the getPostsFromEmail() method when the email is not a poster
test('Testing getting a posters post ids from their email is not in the poster table',async () => {
    const result = await PostDB.getPostsFromEmail('testAccount@gmail.com')
    expect(result).toEqual([])
});

//testing the getPostFromID() method with valid post id
test('Testing getting a post imformation from its id with a valid id',async () => {
    const result = await PostDB.getPostFromID(2)
    const date = new Date("2023-01-30T07:00:00.000Z")
    expect(result).toEqual([2, 'Welding', 'Hi, I need someone who can weld some metal for me', date, 'Inactive', 250.75, 'Welding', 'testPoster@hotmail.com', 'testDeleting@gmail.com'])
});

//testing the getPostFromID() method with invalid post id
test('Testing getting a post imformation from its id with an invalid id',async () => {
    const result = await PostDB.getPostFromID(10)
    expect(result).toEqual([])
});

//testing assigning a contractor to an existing account which does not have a contractor yet
test('Testing assigning a contractor to a post without one',async () => {
    
});

//testing assigning a contractor to an existing account which does not have a contractor yet
test('Testing assigning a contractor to a post with one',async () => {
    const result = await PostDB.assignContractor(1, 'testDeleting@gmail.com')
    expect(result).toBe(true)
});

//testing setting a post inactive when not inactive
test('Testing setting a post to inactive',async () => {
    const result = await PostDB.setPostInactive(1)
    expect(result).toBe(true)
});

//testing setting a post active
test('Testing setting a post to active',async () => {
    const result = await PostDB.setPostActive(1)
    expect(result).toBe(true)
});

//testing setting a post in progress
test('Testing setting a post to active',async () => {
    const result = await PostDB.setPostInProgress(1)
    expect(result).toBe(true)
});

//testing getting all posts by skill
test('Testing getting posts by skills',async () => {
    var testingSkills = ['Testing']
    const result = await PostDB.getPostsBySkills(testingSkills)
    expect(result[0].post_id).toEqual(1)
});

//testing updating the price of a post
test('Testing changing the price post',async () => {
    const result = await PostDB.updatePrice(1, 300)
    expect(result).toBe(true)
});

//testing changing the description of a post
test('Testing changing the description of a  post',async () => {
    const result = await PostDB.updateDescription(1, 'This is the updated testing')
    await PostDB.closeConnection()
    expect(result).toBe(true)
});

//await PostDB.connection.end()