const PostDB = require('../post.js')

//testing the createPost method for when the email is not in the poster table yet
test('Testing creating a post when poster does not yet exist in Poster Table', async () => {
    const result = await PostDB.createPost('description', '2023-03-19', 
                    'active', 400, 'painting', 'christ@gmail.com')
    expect(result).toBe(true)
});

//testing the createPost method for when the email is in the poster table
test('Testing creating a post when poster exists in Poster Table', async () => {
    const result = await PostDB.createPost('description', '2023-03-19', 
                    'active', 400, 'painting', 'fun@gmail.com')
    expect(result).toBe(true)
});

//testing the deletePost() method when the id exists in the table
test('Testing deleting a post when post_id exists in Job_Posting Table', async () => {
    const result = await PostDB.deletePost(1)
    expect(result).toBe(true)
});

//testing the deletePost() method when the id does not exists in the table
test('Testing deleting a post when post_id does not exist in Job_Posting Table', async () => {
    const result = await PostDB.deletePost(10)
    expect(result).toBe(true)
});


//testing the deletePost() method when the id does not exists in the table
test('Testing deleting a post when post_id exists in Job_Posting Table', async () => {
    const result = await PostDB.deletePost(1)
    expect(result).toBe(true)
});

//testing the getPostsFromEmail() method when the poster email exists with posts
test('Testing getting a posters post ids from their email when posts exists for them',async () => {
    const result = await PostDB.getPostsFromEmail('email123@shaw.ca')
    expect(result).toEqual([2, 3])
});

//testing the getPostsFromEmail() method when the poster email exists with no posts
test('Testing getting a posters post ids from their email when posts do not exist for them',async () => {
    const result = await PostDB.getPostsFromEmail('ethan@ucalgary.ca')
    expect(result).toEqual([])
});

//testing the getPostsFromEmail() method when the email is not a poster
test('Testing getting a posters post ids from their email is not in the poster table',async () => {
    const result = await PostDB.getPostsFromEmail('christina@gmail.com')
    expect(result).toEqual([])
});

//testing the getPostFromID() method with valid post id
test('Testing getting a post imformation from its id with a valid id',async () => {
    const result = await PostDB.getPostFromID(2)
    const date = new Date("2023-01-30T07:00:00.000Z")
    expect(result).toEqual([2, 'Hi, I need someone who can weld some metal for me', date, 'Inactive', 250.75, 'Welding', 'email123@shaw.ca', 'christina@gmail.com'])
});

//testing the getPostFromID() method with invalid post id
test('Testing getting a post imformation from its id with a valid id',async () => {
    const result = await PostDB.getPostFromID(10)
    const date = new Date("2023-01-30T07:00:00.000Z")
    expect(result).toEqual([])
});