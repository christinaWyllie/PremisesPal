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
    skills		VARCHAR(50),
    
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
    dateOfPosting		DATETIME,
    status				VARCHAR(15),
    price				FLOAT,
    requiredSkills		VARCHAR(50),
    
    poster_email		VARCHAR(50),
    contractor_email	VARCHAR(50),
    
	PRIMARY KEY (post_id),
    FOREIGN KEY (poster_email) REFERENCES POSTER(email),
    FOREIGN KEY (contractor_email) REFERENCES CONTRACTOR(email)
);

CREATE TABLE REVIEW
(
	job_id				INT NOT NULL, #will be a copy of the post_id, not dependent tho
	reviewer_email		VARCHAR(50),
    reviewee_email		VARCHAR(50),
    date				DATETIME, #date the review was made
    feedback			VARCHAR(200),
    job_type			VARCHAR(50),
    stars				INT, #should be a number from 1-5
    
    FOREIGN KEY  (reviewee_email) REFERENCES CONTRACTOR(email),
    FOREIGN KEY (reviewer_email) REFERENCES POSTER(email)
);

INSERT INTO ACCOUNT
VALUES     ('testAccount@gmail.com', 'testAccount'), 
			('testPoster@hotmail.com', 'testPoster'),
            ('testContractor@yahoo.ca', 'testContractor');
        
INSERT INTO POSTER
VALUES    ('testPoster@hotmail.com');

INSERT INTO CONTRACTOR
VALUES    ('testContractor@yahoo.ca', 'I am a testor. I am great at testing. I like testing. Yay yahoo.');

INSERT INTO CONTRACTOR_SPECIALTIES
VALUES    ('testContractor@yahoo.ca','Testing');

INSERT INTO CONTRACTOR_REFERENCES
VALUES    ('testContractor@yahoo.ca','I have none');

INSERT INTO JOB_POSTING
VALUES    (1,'Hi, I need someone to test something for me', '2023-03-19', 'Active', 123.45, 'Testing', 'testPoster@hotmail.com', 'testContractor@yahoo.ca');

INSERT INTO REVIEW
VALUES    (1, 'testPoster@hotmail.com', 'testContractor@yahoo.ca','2023-04-1', 'Wow', 'Testing', 5);

-- SELECT * FROM ACCOUNT;
-- SELECT * FROM POSTER;
-- SELECT * FROM CONTRACTOR;
-- SELECT * FROM CONTRACTOR_SPECIALTIES;
-- SELECT * FROM CONTRACTOR_REFERENCES;
-- SELECT * FROM JOB_POSTING;
-- SELECT * FROM REVIEW;