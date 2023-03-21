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
const Post = require('./backend/fullstack/post.js');

// port number
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
// set app to look for views in public 
app.set('views', path.join(__dirname));

// set default directory
app.use(express.static("public/frontend/"));


// Array of posts to be used for testing will eventually need to get from backend
const posts = [
	new Post("Broken Sink", "Sample description for a job posting - need someone who knows how to fix a leaky kitchen sink", 100, ["Plumber", "Sink"], "johnNotScott@gmail.com"),
	new Post("Toilet Overflowing", "Poo-Poo dont flush ", 50, ["Plumber", "Big-Load"], "stinky@example.com"),
  ];

// default route
app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, "/frontend/home.html"));

});

const loginResult = false;

// handle login requests
app.post('/Login', async (req, res) => {
	const { email, password } = req.body;
	const loginResult = await Login.loginUser(email, password);
	if (loginResult === true) {
	  console.log("login successful, redirecting...");
	  res.status(302).redirect('feed.html');
	} else {
	  console.log("login unsuccessful");
	  // Pass loginResult to Login.ejs rendering
	  res.render('frontend/Login', { loginResult });
	}
  });

//handle register requests
app.post('/Register', async (req,res) => {
	// need to add implementation for skills
	const { uname, psw } = req.body;
	const registrationResult = await Register.registerAccount(uname, psw);
	if (registrationResult == true) {
		console.log("registration successful, redirecting...");
		res.status(302).redirect('feed.html');
	} else {
		console.log("registration unsuccessful");
		res.status(302).redirect('Register.html');
		//need to add error message somehow
	}

});

//handle register requests
app.post('/createPost', async (req,res) => {
	const { title, description, price, email, carpentry, plumbing, cleaning, electrical, landscaping, painting, other } = req.body;
	const requiredSkills = [];
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
	const post = new Post(title, description, price, requiredSkills, email);
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

// Send the post data MUST MAKE THIS WORK AFTER NEW POST TOO
app.get('/feed.html', (req, res) => {
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

// start listening on PORT port
app.listen(process.env.PORT || port, () => console.log("App available on http://localhost:3000"));