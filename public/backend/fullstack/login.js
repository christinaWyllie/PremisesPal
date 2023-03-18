const AccountDB = require("../src/account.js")

class Login {

    static async loginUser(email, password) {
        console.log(AccountDB.validateUsername(email))
        const usernameResult = await AccountDB.validateUsername(email)
        if (usernameResult == false) {
            console.log('username is incorrect.')
            return false
        }
        const passwordResult = await AccountDB.validatePassword(email, password)
        if (passwordResult == false) {
            console.log('password is incorrect')
            return false
        }
        console.log("login middleware checks successful.")
        return true
    }

}

module.exports = Login;