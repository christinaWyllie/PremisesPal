class Register{
    static async registerAccount(email, password){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^(?=.*\d).{8,}$/

        if (!passwordRegex.test(password)) {
            return false
        }

        if (emailRegex.test(email)){
            
            if (Account.validateUsername(email)) {
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

        if (Account.registerUser(email, password)) {
            console.log("account registration error in the database.")
            return false
        }

        console.log("successfully registered account.")
        return true
    }


}