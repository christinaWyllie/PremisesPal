const AccountDB = require("../src/post.js")

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
        const usernameResult = await Post.createPost(title, description, dateOfPosting, "Active", price, requiredSkills, email);
        return usernameResult;
    }

    getID(){
        return this.id
    }
    getDescription(){
        return this.description
    }
    getPostDate(){
        return this.dateOfPosting
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