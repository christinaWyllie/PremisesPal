// PremisesPal
// index.js 

// includes //
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const {readFile} = require("fs").promises;
const Login = require("./backend/fullstack/login.js")
const Register = require("./backend/fullstack/register.js")
const Post = require('./backend/fullstack/post.js')
const Review = require('./backend/fullstack/review.js')
const PostDB = require('./backend/src/post.js')
const ContractorDB = require('./backend/src/contractor.js')
const ReviewDB = require('./backend/src/review.js')

// port number
const port = 3000;

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const session = require('express-session');
const AccountDB = require("./backend/src/account.js");
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
// set app to look for views in public 
app.set('views', path.join(__dirname));

// set default directory
app.use(express.static("public/frontend/"));

// default route
app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, "/frontend/home.html"));
	console.log(path.join(__dirname, "/frontend/home.html"))

});

const loginResult = false;

app.post('/Login', async (req, res) => {
	const { email, password } = req.body;
	const loginResult = await Login.loginUser(email, password);
	if (loginResult === true) {
	  console.log("login successful, redirecting...");
	  req.session.user = { email };
	  res.status(302).redirect('feed.html');
	} else {
	  console.log("login unsuccessful");
	  // Pass loginResult to Login.ejs rendering
	  res.render('frontend/Login', { loginResult });
	}
  });

//handle register requests
app.post('/Register', async (req,res) => {
	
	// implementation for creating account does not distinguish poster or contractor
	const { email, psw } = req.body;
	const registrationResult = await Register.registerAccount(email, psw);
	if (registrationResult == true) {
		console.log("registration successful, redirecting...");
		req.session.user = { email };

		const userType = req.body.role;
		if (userType == "homeOwner"){
			const posterRegistrationResult = await PostDB.addPoster(email);
			if (posterRegistrationResult) {
				console.log("poster registration success");
				res.status(302).redirect('feed.html');
			} else {
				console.log("was unable to register as a poster");
				res.status(302).redirect('register.html');
			}

		}
		else if (userType == "contractor"){
			const contractorRegistrationResult = await ContractorDB.addContractor(email, "Default biography");
			if (contractorRegistrationResult){
				// checks whether skills have been checked or not
				const carpentrySkill = req.body.carpentry !== undefined;
				if (carpentrySkill) await ContractorDB.addSkill(email, "Carpentry");
				const plumbingSkill = req.body.plumbing !== undefined;
				if (plumbingSkill) await ContractorDB.addSkill(email, "Plumbing");
				const cleaningSkill = req.body.cleaning !== undefined;
				if (cleaningSkill) await ContractorDB.addSkill(email, "Cleaning");
				const electricalSkill = req.body.electrical !== undefined;
				if (electricalSkill) await ContractorDB.addSkill(email, "Electrical");
				const landscapingSkill = req.body.landscaping !== undefined;
				if (landscapingSkill) await ContractorDB.addSkill(email, "Landscaping");
				const paintingSkill = req.body.painting !== undefined;
				if (paintingSkill) await ContractorDB.addSkill(email, "Painting");
				const otherSkill = req.body.other !== undefined;
				if (otherSkill) await ContractorDB.addSkill(email, "Other");
				res.status(302).redirect('feed.html');
			}
			else {
				console.log("Was unable to register as a contractor");
			}
		}
		else{
			// should never get to this else statement as the user selects homeOwner or contractor
			// from a dropdown menu
			console.log("Issue with the user type");
		}
	} else {
		console.log("registration unsuccessful");
		res.render('frontend/Register', { registrationResult });
		//need to add error message somehow
	}

});

app.post('/createPost', async (req,res) => {

	if (!req.session || !req.session.user || !req.session.user.email) {
		console.log('No email found in the session');
		res.status(401).send('Unauthorized access');
		return;
	}
	const userEmail = req.session.user.email;

	const { title, description, price, carpentry, plumbing, cleaning, electrical, landscaping, painting, other } = req.body;
	const requiredSkills = [];
	
	const regex = /^-?\d+(\.\d+)?$/;

	if (!regex.test(price)) {
		res.status(401).send('Unauthorized Post');
		return;
	}

	//bla bla required skills check
	if (carpentry) {
		requiredSkills.push("Carpentry");
	}
	if (plumbing) {
		requiredSkills.push("Plumbing");
	}
	if (cleaning) {
		requiredSkills.push("Cleaning");
	}
	if (electrical) {
		requiredSkills.push("Electrical");
	}
	if (landscaping) {
		requiredSkills.push("Landscaping");
	}
	if (painting) {
		requiredSkills.push("Painting");
	}
	if (other) {
		requiredSkills.push("Other");
	}
	const post = new Post(title, description, price, requiredSkills, userEmail);
	const postResult = await post.addToDatabase();
	if (postResult == true) {
		console.log("successfully added post to database.");
		res.status(302).redirect('feed.html');
	} else {
		console.log("adding post to database failed.");
		res.status(302).redirect('feed.html');
		//better error checking once again
	}

});

app.get('/home', (req, res) => {
	if (req.session && req.session.user) {
		req.session.destroy();
	}
	res.sendFile(path.join(__dirname, "/frontend/home.html"));
});

// Send the post data MUST MAKE THIS WORK AFTER NEW POST TOO
app.get('/feed.html', async (req, res) => {
	if (!req.session || !req.session.user || !req.session.user.email) {
		console.log('No email found in the session');
		res.status(401).send('Unauthorized access');
		return;
	}
	  
	const userEmail = req.session.user.email;

	var skills = [];
	skills = await ContractorDB.viewSkills(userEmail)
	console.log("SKILLS");
	console.log(skills)

	const allPosts = await PostDB.getPostsBySkills(skills);
	const posts = []
	
	for (let i = 0; i < allPosts.length; i++) {
		const posterID = await PostDB.getPostFromID(allPosts[i].post_id);
		const post = new Post(posterID[1], posterID[2], posterID[5], posterID[6].split(','), posterID[7]);
		posts.push(post);
	}
	
	res.render('frontend/feed', { posts }, (err, html) => {
		if (err) {
		  console.error(err);
		  res.status(500).send('Error rendering feed');
		} else {
		  res.send(html);
		}
	  });
  });

// Send the post data MUST MAKE THIS WORK AFTER NEW POST TOO
app.get('/Login.html', (req, res) => {
	res.render('frontend/Login', { loginResult: null }, (err, html) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Error rendering Login');
	  } else {
		res.send(html);
	  }
	});
  });

  app.get('/Register.html', (req, res) => {
	res.render('frontend/Register', { registrationResult: null }, (err, html) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Error rendering Register');
	  } else {
		res.send(html);
	  }
	});
  });

  app.get('/account.html', async (req, res) => {
	if (!req.session || !req.session.user || !req.session.user.email) {
	  console.log('No email found in the session');
	  res.status(401).send('Unauthorized access');
	  return;
	}
  
	const userEmail = req.session.user.email;
	const skills = await ContractorDB.viewSkills(userEmail);
  
	const postIDs = await PostDB.getPostsFromEmail(userEmail);
	const posts = [];
	for (let i = 0; i < postIDs.length; i++) {
	  const posterID = await PostDB.getPostFromID(postIDs[i]);
	  const post = new Post(posterID[1], posterID[2], posterID[5], posterID[6].split(','), posterID[7]);
	  posts.push(post);
	}
  
	res.render('frontend/account', { email: userEmail, skills, posts }, (err, html) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Error rendering account');
	  } else {
		res.send(html);
	  }
	});
  });


	app.post('/review-details', async (req, res) => {
		if (!req.session || !req.session.user || !req.session.user.email) {
			console.log('No email found in the session');
			res.status(401).send('Unauthorized access');
			return;
		}
		const userEmail = req.session.user.email;

		const { email } = req.body;
		console.log(email);
	  
		const reviews = await ReviewDB.viewReviewByEmail(email);
		console.log(reviews);

		const allReviews = [];

		for (let i = 0; i < reviews.length; i++) {
			allReviews.push(new Review(reviews[i].reviewer_email, reviews[i].reviewee_email, reviews[i].feedback, reviews[i].job_type, reviews[i].stars));
		}
	  
		// Pass the email along with the review to the review-details.ejs template
		res.render('frontend/review-details', { allReviews });
	  });

	app.get('/create-review.html', (req, res) => {
		res.render('frontend/create-review', {emailInDatabase: true}, (err, html) => {
			if (err) {
				console.error(err);
				res.status(500).send('Error rendering create-review 297');
			} else {
				res.send(html);
			}
		});
	});

app.post('/create-review', async (req,res) => {

	if (!req.session || !req.session.user || !req.session.user.email) {
		console.log('No email found in the session');
		res.status(401).send('Unauthorized access');
		return;
	}
	const userEmail = req.session.user.email;

	const { revieweeEmail, feedback, stars, carpentry, plumbing, cleaning, electrical, landscaping, painting, other } = req.body;

	const emailFound = await AccountDB.validateUsername(revieweeEmail);
	if (!emailFound){
		res.render('frontend/create-review', {emailInDatabase: false}, (err, html) => {
			if (err) {
				console.error(err);
				res.status(500).send('Error rendering create-review 320');
			} else {
				res.send(html);
			}
		});
	}
	else{
		var jobType = "";

		//monke code go brrrr
		if (carpentry) {
			jobType = "Carpentry";
		}
		if (plumbing) {
			jobType = "Plumbing";
		}
		if (cleaning) {
			jobType = "Cleaning";
		}
		if (electrical) {
			jobType = "Electrical";
		}
		if (landscaping) {
			jobType = "Landscaping";
		}
		if (painting) {
			jobType = "Painting";
		}
		if (other) {
			jobType = "Other";
		}
		var reviewResult;

		try {
			reviewResult = await ReviewDB.createReview(userEmail, revieweeEmail, feedback, jobType, stars);
			console.log(reviewResult);
		} catch (error) {
			console.log(error);
			//ERROR CHECK HERE
		}

		if (reviewResult == true) {
			console.log("successfully added review to database.");
			res.status(302).redirect('feed.html');
		} else {
			console.log("adding review to database failed.");
			res.status(302).redirect('feed.html');
			//better error checking once again
		}
	}

});

	  
// start listening on PORT port
app.listen(process.env.PORT || port, () => console.log("App available on http://localhost:3000"));