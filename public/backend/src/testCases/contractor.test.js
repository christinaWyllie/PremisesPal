const ContractorDB = require("../contractor.js");

// ===================== Contractor.JS TEST CASES =====================
describe('ContractorDB', () => {
    // Set up procedure. Establishes DB connection before all tests, and ends once tests are complete.
    beforeAll(async () => {
        await ContractorDB.makeConnection();
    });

    afterAll(async () => {
        await ContractorDB.connection.end();
    });

// -------------------- addContractor() --------------------
    describe('addContractor()', () => {
        // Ensures addContractor() returns true given a new contractor
        //TC6
        it('should return true given a new contractor', async () => {
            const result = await ContractorDB.addContractor('testNewContractor@gmail.com', 'I am a new contractor');
            expect(result).toBe(true);
        });

        // Ensures addContractor() returns false given an existing contractor
        //TC7
        it('should return true given an existing Contractor', async () => {
            const result = await ContractorDB.addContractor('testContractor@yahoo.ca', 'I am an existing contractor');
            expect(result).toBe(true);
        });
    });

// -------------------- addReference() --------------------
    describe('addReference()', () => {
        // Ensures addReference() returns true given a reference
        //TC8
        it('should return true given a new reference', async () => {
            const result = await ContractorDB.addReference('testContractor@yahoo.ca', 'This is a new reference');
            expect(result).toBe(true);
        });
    });

// -------------------- addSkill() --------------------
    describe('addSkill()', () => {
        // Ensures addSkill() returns true given a skill
        //TC9
        it('should return true given a new skill', async () => {
            const result = await ContractorDB.addSkill('testContractor@yahoo.ca', 'This is a new skill');
            expect(result).toBe(true);
        });
    });

// -------------------- viewReferences() --------------------
    describe('viewReferences()', () => {
        // Ensures validateUsername() returns true given existing Contractor
        //TC10
        it('should return references given an existing Contractor', async () => {
            const result = await ContractorDB.viewReferences('testContractor@yahoo.ca');

            var references = ["Testing default first reference", "This is a new reference"];
            
            expect(result).toStrictEqual(references);
        });
    });

// -------------------- viewSkills() --------------------
    describe('viewSkills()', () => {
        // Ensures validateUsername() returns true given existing Contractor
        //TC11
        it('should return skills given an existing Contractor', async () => {
            const result = await ContractorDB.viewSkills('testContractor@yahoo.ca');

            var skills = ["Landscaping", "This is a new skill"];

            expect(result).toStrictEqual(skills);
        });
    });
});