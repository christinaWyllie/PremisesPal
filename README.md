# PremesisPal

# For database creation:
Create a new username using Command Line Client with:
CREATE USER 'seng401'@'localhost' IDENTIFIED BY 'pal';
Then to grant access:
grant all privileges on `PremisesPal`.* to 'seng401'@'localhost';

#Running:
To run the program on local host use: node public/index.js

#Link to deployed website:
http://ec2-3-15-178-47.us-east-2.compute.amazonaws.com:3000/

#Running Tests:
To run the tests locally, download the testData.sql file in the same spot as the database from above. 
Go to the following directory on your command line: public\backend\src\testCases 
Run the tests using npx jest (this will run all 35 tests)
