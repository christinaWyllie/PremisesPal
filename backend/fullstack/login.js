class Login {

    static account = require('uhhh whatever path account is in')

    static async loginUser(email, password) {
        if (account.validateUsername(email)) {
            console.log('username is incorrect.')
            return false
        }
        if (account.validatePassword(password)) {
            console.log('password is incorrect')
            return false
        }
        return true
    }

}