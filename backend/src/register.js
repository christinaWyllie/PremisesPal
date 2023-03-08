class Register{
    static registerAccount(email, password, skills){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)){
            
            if (Account.validateUsername(email)) {
                console.log("email is already in use dumguy!");
                return false;
            }

            if (password.length < 4 || password.length > 16){
                console.log("password must be between 4 and 16 characters.");
                return false;
            }
        }
        else {
            console.log("invalid email syntax doofus.");
            return false;
        }
    }

}