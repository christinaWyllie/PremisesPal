class Post{

    Post(){
        // test constructor for frontend
        // id, description, dateOfPosting, available, price, requiredSkills, poster_email, contractor_email
        this.id = 101;
        this.description = "Sample description for a job posting - need someone who knows how to fix a leaky kitchen sink"
        this.available = true;
        this.dateOfPosting = new Date()
        this.price = 100
        this.requiredSkills = ["Plumber", "Sink"]
        this.posterEmail = "johnNotScott@gmail.com"
        // contractor email field not set until poster accepts contractor
        this.contractorEmail = ""
    }

    Post(id){
        // will load all information about the post from the database
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