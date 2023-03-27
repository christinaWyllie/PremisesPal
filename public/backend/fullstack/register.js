const AccountDB = require("../src/account.js")

class Register{

    //static account = require('uhhh whatever path account is in')

    static async registerAccount(email, password){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^(?=.*\d).{8,}$/

        if (passwordRegex.test(password)) {
            console.log("password was not proper")
            return false
        }

        if (emailRegex.test(email)){
            if (await AccountDB.validateUsername(email)) {
                console.log("email is already in use dumguy!");
                return false
            }

            if (password.length < 4 || password.length > 16){
                console.log("password must be between 4 and 16 characters.");
                return false
            }
        }
        else {
            console.log("invalid email syntax doofus.")
            return false
        }

        if (! await AccountDB.registerUser(email, password)) {
            console.log("account registration error in the database.")
            return false
        }

        console.log("successfully registered account.")
        return true
    }
}

module.exports = Register;