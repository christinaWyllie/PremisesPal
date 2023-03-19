DROP DATABASE IF EXISTS `PremisesPal`;
CREATE DATABASE `PremisesPal`;
USE `PremisesPal`;

DROP TABLE IF EXISTS ACCOUNT;
CREATE TABLE ACCOUNT
(
	email		VARCHAR(50)	NOT NULL,
    pass		VARCHAR(17)	NOT NULL,
    
    PRIMARY KEY (email)
);

DROP TABLE IF EXISTS POSTER;
CREATE TABLE POSTER
(
	email		VARCHAR(50)	NOT NULL,
    
    UNIQUE(email),
    
    FOREIGN KEY  (email) REFERENCES ACCOUNT(email)
);

DROP TABLE IF EXISTS CONTRACTOR;
CREATE TABLE CONTRACTOR
(
	email		VARCHAR(50)	NOT NULL,
    biography	VARCHAR(500),
    
    UNIQUE(email),
    
    FOREIGN KEY  (email) REFERENCES ACCOUNT(email)
);

DROP TABLE IF EXISTS CONTRACTOR_SPECIALTIES;
CREATE TABLE CONTRACTOR_SPECIALTIES
(
	email		VARCHAR(50)	NOT NULL,
    skills		VARCHAR(200),
    
    FOREIGN KEY  (email) REFERENCES CONTRACTOR(email)
);

DROP TABLE IF EXISTS CONTRACTOR_REFERENCES;
CREATE TABLE CONTRACTOR_REFERENCES
(
	email		VARCHAR(50)	NOT NULL,
    ref			VARCHAR(100),
    
    FOREIGN KEY  (email) REFERENCES CONTRACTOR(email)
);


DROP TABLE IF EXISTS JOB_POSTING;
CREATE TABLE JOB_POSTING
(
	post_id				INT NOT NULL AUTO_INCREMENT,
    title				VARCHAR(30),
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

DROP TABLE IF EXISTS REVIEW;
CREATE TABLE REVIEW
(
	job_id				INT NOT NULL, #will be a copy of the post_id, not dependent tho
	reviewer_email		VARCHAR(50),
    reviewee_email		VARCHAR(50),
    date				DATE, #date the review was made
    feedback			VARCHAR(200),
    job_type			VARCHAR(200),
    stars				INT, #should be a number from 1-5
    
    
    FOREIGN KEY  (reviewee_email) REFERENCES CONTRACTOR(email),
    FOREIGN KEY (reviewer_email) REFERENCES POSTER(email)
);