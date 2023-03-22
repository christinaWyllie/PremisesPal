const PostDB = require("../src/post.js")

class Post {

    constructor(title, description, price, requiredSkills = [], posterEmail) {
        this.title = title;
        this.id;
        this.description = description;
        this.available = true;
        this.dateOfPosting = new Date();
        this.price = price;
        this.requiredSkills = requiredSkills;
        this.posterEmail = posterEmail;
        this.contractorEmail = "";
    }

    async addToDatabase() {

        const usernameResult = await PostDB.createPost(this.title, this.description, this.getPostDate(), "Active", this.price, this.requiredSkills, this.posterEmail);
        return usernameResult;
    }

    getID(){
        return this.id
    }
    getDescription(){
        return this.description
    }
    getPostDate(){
        const year = this.dateOfPosting.getFullYear();
        const month = String(this.dateOfPosting.getMonth() + 1).padStart(2, '0');
        const day = String(this.dateOfPosting.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    getStatus(){
        return this.available
    }
    getPrice(){
        return this.price
    }
    getReqSkills(){
        return this.requiredSkills
    }
    getPosterEmail(){
        return this.posterEmail
    }
    getContractorEmail(){
        return this.contractorEmail
    }
}

module.exports = Post;