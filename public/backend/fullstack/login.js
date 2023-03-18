const AccountDB = require("../src/account.js")

class Login {

    static async loginUser(email, password) {
        console.log(AccountDB.validateUsername(email))
        if (AccountDB.validateUsername(email) == false) {
            console.log('username is incorrect.')
            return false
        }
        if (AccountDB.validatePassword(email, password) == false) {
            console.log('password is incorrect')
            return false
        }
        console.log("login middleware checks successful.")
        return true
    }

}

module.exports = Login;