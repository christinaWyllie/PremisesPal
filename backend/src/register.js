class Register{
    static registerAccount(username, password, skills){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(username)){
            
            if (password.length >= 4 && password.length <= 16){
                // register the account 
            }
            else{
                // let them know the password must be between 4 and 16 characters
            }
        }
        else {
            // let them know the username is not a valid email
        }
    }
}