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

// port number
const port = 3000;

// set default directory
app.use(express.static("public/frontend/"));

// default URL
app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, "/frontend/home.html"));

});

// handle login requests
app.post('/Login', async (req, res) => {
	const { email, password } = req.body;
	const loginResult = await Login.loginUser(email, password);
	if (loginResult == true) {
		console.log("login successful, redirecting...");
		res.status(302).redirect('account.html');
	} else {
		console.log("login unsuccessful");
		res.status(302).redirect('login.html');
		//need to add error message somehow
	}

});

// start listening on PORT port
app.listen(process.env.PORT || port, () => console.log("App available on http://localhost:3000"));