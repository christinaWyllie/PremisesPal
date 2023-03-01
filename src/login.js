class Login{
    static sendUserPass(username, password){
        if (Connection.validateUsername(username) == false){
            // Message to login screen that username is not registered
            return;
        }
        if (Connection.validatePassword(password) == false){
            // Message to login screen password is incorrect
            return;
        }
        // login user
    }
}