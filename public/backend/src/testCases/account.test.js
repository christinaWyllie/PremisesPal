const AccountDB = require("../account.js");
const assert = require('assert');

//validate username
test('Testing validateUsername() with existing username', async () => {
    const result = await AccountDB.validateUsername('testAccount@gmail.com');
    assert.strictEqual(result, true);
});

test('Testing validateUsername() with non-existent username', async () => {
    const result = await AccountDB.validateUsername('nonexistent@gmail.com');
    assert.strictEqual(result, false);
});

//validate password
test('Testing validatePassword with correct password', async () => {
    const result = await AccountDB.validatePassword('testAccount@gmail.com', 'testAccount');
    assert.strictEqual(result, true);
});

test('Testing validatePassword with incorrect password', async () => {
    const result = await AccountDB.validatePassword('testAccount@gmail.com', 'incorrectPassword');
    assert.strictEqual(result, false);
});

//register user
test('Testing registerUser with ', async () => {
    const result = await AccountDB.registerUser('testNewAccount@gmail.com', 'testNewAccount');
    assert.strictEqual(result, true);
});