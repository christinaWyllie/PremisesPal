//create a connection to MYSQL
const mysql = require('mysql');

class Connection{    
    static connection;

    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'seng401',
            password: 'pal', 
            database: 'PremisesPal'
        })
        
        this.connection.connect(function(err) {
            if(err) {
                return console.error('Unable to connect to database' + err.message);
            }

            console.log('Connection created successfully!');
        });
    }
    
    validateUsername(username){
        var checked = false;
        console.log("at thw top");
        this.connection.query("SELECT * FROM ACCOUNT WHERE email = '" + username + "'", function(err, results, fields){
            if(err){
                console.log(typeof(err));
                checked = false;
            }
            console.log(results.length);
            //console.log(localResults);
             // Check if results are empty, thus no catches; return false.
            if(results.length == 0 || results == undefined) {
                checked = false;
                return;
            }

            if(results[0].email == username){
                checked = true;
            } else{
                checked = false;
            }
        });

        console.log("LocalResults is:" + localResults);

       

        return checked;
    }

    // validateUserPassword(username, password) {
    //     var checked = true;
    //     this.connection.query("SELECT pass FROM ACCOUNT WHERE email = '" + username + "'", function(err, results, fields){
    //         console.log(results);

    //         if(err){
    //             console.log(typeof(err));
    //             checked = false;
    //         }

            
    //         if(results[0].pass == password){
    //             checked = true;
    //         } else{
    //             checked = false;
    //         }
    //     });
    //     return checked;
    // }
}

var connect = new Connection();
var checked = connect.validateUsername("christ@gmail.com");
console.log("Checked is: " + checked);
if(checked) {
    console.log("Username exists");
    // var doubleChecked = connect.validateUserPassword("password");
    // console.log("doubleChecked is: " + doubleChecked);

    // if(doubleChecked) {
    //     console.log("User has successfully logged in");
    // } else {
    //     console.log("Incorrect password");
    // }
} else {
    console.log("Username does not exist");
}