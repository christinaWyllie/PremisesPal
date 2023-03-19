class Post{

    // Post(){
    //     // test constructor for frontend
    //     // id, description, dateOfPosting, available, price, requiredSkills, posterEmail, contractorEmail
    //     this.id = 101;
    //     this.description = "Sample description for a job posting - need someone who knows how to fix a leaky kitchen sink"
    //     this.available = true;
    //     this.dateOfPosting = new Date()
    //     this.price = 100
    //     this.requiredSkills = ["Plumber", "Sink"]
    //     this.posterEmail = "johnNotScott@gmail.com"
    //     // contractor email field not set until poster accepts contractor
    //     this.contractorEmail = ""
    // }

    // Post(id, description, dateOfPosting, available, price, requiredSkills, posterEmail, contractorEmail){
    //     // will load all information about the post from the database
    // }

    // // test constructor
    // Post(description, price, requiredSkills = [], posterEmail) {
    //     this.description = description;
    //     this.price = price;
    //     this.requiredSkills = requiredSkills;
    //     this.posterEmail = posterEmail;
    //   }

    static idCounter = 100;

    constructor(description, price, requiredSkills = [], posterEmail) {
      this.id = Post.generateId();
      this.description = description;
      this.available = true;
      this.dateOfPosting = new Date();
      this.price = price;
      this.requiredSkills = requiredSkills;
      this.posterEmail = posterEmail;
      this.contractorEmail = "";
    }
  
    static generateId() {
      Post.idCounter += 1;
      return Post.idCounter;
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