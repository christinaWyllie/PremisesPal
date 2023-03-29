DROP DATABASE IF EXISTS `PremisesPal`;
CREATE DATABASE `PremisesPal`;
USE `PremisesPal`;

DROP TABLE IF EXISTS ACCOUNT;
DROP TABLE IF EXISTS POSTER;
DROP TABLE IF EXISTS CONTRACTOR;
DROP TABLE IF EXISTS CONTRACTOR_REFERENCES;
DROP TABLE IF EXISTS CONTRACTOR_SPECIALTIES;
DROP TABLE IF EXISTS JOB_POSTING;
DROP TABLE IF EXISTS POSTER;
DROP TABLE IF EXISTS REVIEW;

CREATE TABLE ACCOUNT
(
	email		VARCHAR(50)	NOT NULL,
    pass		VARCHAR(25)	NOT NULL,
    
    PRIMARY KEY (email)
);

CREATE TABLE POSTER
(
	email		VARCHAR(50)	NOT NULL,
    
    FOREIGN KEY  (email) REFERENCES ACCOUNT(email)
);

CREATE TABLE CONTRACTOR
(
	email		VARCHAR(50)	NOT NULL,
    biography	VARCHAR(500),
    
    FOREIGN KEY  (email) REFERENCES ACCOUNT(email)
);

CREATE TABLE CONTRACTOR_SPECIALTIES
(
	email		VARCHAR(50)	NOT NULL,
    skills		VARCHAR(200),
    
    FOREIGN KEY  (email) REFERENCES CONTRACTOR(email)
);

CREATE TABLE CONTRACTOR_REFERENCES
(
	email		VARCHAR(50)	NOT NULL,
    ref			VARCHAR(100),
    
    FOREIGN KEY  (email) REFERENCES CONTRACTOR(email)
);

CREATE TABLE JOB_POSTING
(
	post_id				INT NOT NULL AUTO_INCREMENT,
    title 				VARCHAR(30),
	description			VARCHAR(500),
    dateOfPosting		DATE,
    status				VARCHAR(15),
    price				FLOAT,
    requiredSkills		VARCHAR(200),
    
    poster_email		VARCHAR(50),
    contractor_email	VARCHAR(50),
    
	PRIMARY KEY (post_id),
    FOREIGN KEY (poster_email) REFERENCES POSTER(email),
    FOREIGN KEY (contractor_email) REFERENCES CONTRACTOR(email)
);

CREATE TABLE REVIEW
(
	reviewID			INT NOT NULL auto_increment,
	reviewer_email		VARCHAR(50),
    reviewee_email		VARCHAR(50),
    date				DATE, #date the review was made
    feedback			VARCHAR(200),
    job_type			VARCHAR(200),
    stars				INT, #should be a number from 1-5
    
    PRIMARY KEY (reviewID),
    FOREIGN KEY  (reviewee_email) REFERENCES ACCOUNT(email),
    FOREIGN KEY (reviewer_email) REFERENCES ACCOUNT(email)
);

INSERT INTO ACCOUNT
VALUES  ('testAccount@gmail.com', 'testAccount'), 
		('testPoster@hotmail.com', 'testPoster'),
        ('testContractor@yahoo.ca', 'testContractor'),
        ('testDeleting@gmail.com', 'testDeleting'),
        ('testPostings@shaw.ca', 'testPosting'), 
        ('testEmpty@hotmail.com', 'empty'), 
        ('testAdding@gmail.com', 'adding'),
        ('testNewPoster@gmail.com', 'new'),
        ('testNewContractor@gmail.com', 'testNewContractor');
        
INSERT INTO POSTER
VALUES  ('testPoster@hotmail.com'), 
		('testEmpty@hotmail.com'), 
        ('testPostings@shaw.ca');

INSERT INTO CONTRACTOR
VALUES  ('testContractor@yahoo.ca', 'I am a testor. I am great at testing. I like testing. Yay yahoo.'), 
		('testDeleting@gmail.com', 'I am a welder and went to Sait for school. I am good.');

INSERT INTO CONTRACTOR_SPECIALTIES
VALUES 
        ('testContractor@yahoo.ca','Landscaping'), 
		('testDeleting@gmail.com', 'Welding');

INSERT INTO CONTRACTOR_REFERENCES
VALUES  ('testContractor@yahoo.ca','Testing default first reference'), 
		('testDeleting@gmail.com', 'Frank');

INSERT INTO JOB_POSTING
VALUES  (1,'Testing', 'Welding', '2023-03-19', 'Active', 123.45, 'Testing', 'testPoster@hotmail.com', 'testContractor@yahoo.ca'), 
        (2,'Welding', 'Hi, I need someone who can weld some metal for me', '2023-01-30', 'Inactive', 250.75, 'Welding', 'testPoster@hotmail.com', 'testDeleting@gmail.com'),
        (3,'Fix Toilet', 'Hi, I need someone who can fix my toilet', '2023-03-19', 'Inactive', 250.75, 'Welding', 'testPoster@hotmail.com', 'testContractor@yahoo.ca'), 
        (4,'Deleting', 'Hi, I need someone who can delete this for me', '2023-01-30', 'Inactive', 250.75, 'Delete', 'testPostings@shaw.ca', 'testDeleting@gmail.com');
        
INSERT INTO JOB_POSTING(post_id, title, description, dateOfPosting, status, price, requiredSkills, poster_email)
VALUES (5,'Gardening', 'Hi, I need someone who can help me in my garden', '2023-01-30', 'Active', 250.75, 'Landscaping', 'testPoster@hotmail.com');

INSERT INTO JOB_POSTING(post_id, title, description, dateOfPosting, status, price, requiredSkills, poster_email)
VALUES (6,'Painting', 'Hi, I need someone who can help me paint', '2023-03-26', 'Active', 1000, 'Painting', 'testPoster@hotmail.com');

INSERT INTO REVIEW
VALUES    (1, 'testPoster@hotmail.com', 'testContractor@yahoo.ca','2023-04-1', 'Wow', 'Testing', 5);

-- SELECT * FROM ACCOUNT;
-- SELECT * FROM POSTER;
-- SELECT * FROM CONTRACTOR;
-- SELECT * FROM CONTRACTOR_SPECIALTIES;
-- SELECT * FROM CONTRACTOR_REFERENCES;
SELECT * FROM JOB_POSTING;
-- SELECT * FROM REVIEW;