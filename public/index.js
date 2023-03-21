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
const PostDB = require('./backend/src/post.js')
const ContractorDB = require('./backend/src/contractor.js')

// port number
const port = 3000;

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

const session = require('express-session');
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
	// need to add implementation for skills
	const { uname, psw } = req.body;
	const registrationResult = await Register.registerAccount(uname, psw);
	if (registrationResult == true) {
		console.log("registration successful, redirecting...");
		req.session.user = { email };
		res.status(302).redirect('feed.html');
	} else {
		console.log("registration unsuccessful");
		res.status(302).redirect('Register.html');
		//need to add error message somehow
	}

});

//handle register requests
app.post('/createPost', async (req,res) => {

	if (!req.session || !req.session.user || !req.session.user.email) {
		console.log('No email found in the session');
		res.status(401).send('Unauthorized access');
		return;
	}
	const userEmail = req.session.user.email;

	const { title, description, price, carpentry, plumbing, cleaning, electrical, landscaping, painting, other } = req.body;
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

// start listening on PORT port
app.listen(process.env.PORT || port, () => console.log("App available on http://localhost:3000"));