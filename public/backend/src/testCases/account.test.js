const AccountDB = require("../account.js");

// ===================== ACCOUNT.JS TEST CASES =====================
describe('AccountDB', () => {
    // Set up procedure. Establishes DB connection before all tests, and ends once tests are complete.
    beforeAll(async () => {
        await AccountDB.makeConnection();
    });

    afterAll(async () => {
        await AccountDB.connection.end();
    });

// -------------------- ValidateUsername() --------------------
    describe('validateUsername', () => {
        // Ensures validateUsername() returns true given existing account
        it('should return true given an existing account', async () => {
            const result = await AccountDB.validateUsername('testAccount@gmail.com');
            expect(result).toBe(true);
        });

        // Ensures validateUsername() returns false given nonexistent account
        it('should return false given a nonexistent account', async () => {
            const result = await AccountDB.validateUsername('nonexistent@gmail.com');
            expect(result).toBe(false);
        });
    });

// -------------------- ValidatePassword() --------------------
    describe('validatePassword', () => {
        // Ensures validatePassword() returns true given correct account and password
        it('should return true given an existing account and correct password', async () => {
            const result = await AccountDB.validatePassword('testAccount@gmail.com', 'testAccount');
            expect(result).toBe(true);
        });

        // Ensures validatePassword() returns false given correct account and incorrect password
        it('should return false given an existing account and incorrect password', async () => {
            const result = await AccountDB.validatePassword('testAccount@gmail.com', 'incorrectPassword');
            expect(result).toBe(false);
        });
    });

// -------------------- registerUser() --------------------
    describe('registerUser', () => {
        // Ensures registerUser() can register a user given new account and password
        it('should return true given a new account and password', async () => {
            const result = await AccountDB.registerUser('testNewAccount@gmail.com', 'testNewAccount');
            expect(result).toBe(true);
        });
    });
});
