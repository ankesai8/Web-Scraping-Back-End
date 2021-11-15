const {MongoClient} = require("mongodb");

const URL = "mongodb+srv://admin:<9989784422>@cluster0.o45hw.mongodb.net/admin?retryWrites=true&w=majority";
//const DATA_BASE = "computer";
const client =  new MongoClient(process.env.URL);

let mongo = {

    db:null,
    laptops:null,
    async connect()
    {
        try{
             //connecting mongodb
        await client.connect();
        console.log("Mongodb connected");

        this.db = client.db(process.env.DATA_BASE);
        this.laptops=this.db.collection("laptops");
        console.log("setting the database and collections");
        }
        catch(err)
        {
            console.log(err);
        }
       
    } 
}

module.exports = mongo;
