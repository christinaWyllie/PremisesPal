// PremisesPals
// index.js 

// includes //
const express = require("express");
const path = require("path");

const app = express();
const {readFile} = require("fs").promises;

// port number
const port = 3000;

// set default directory
app.use(express.static("public/frontend/"));

// default URL
app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, "/frontend/home.html"));

});



// start listening on PORT port
app.listen(process.env.PORT || port, () => console.log("App available on http://localhost:3000"));