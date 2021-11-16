const {MongoClient} = require("mongodb");

const {MongoClient} = require("mongodb");

//mongodb+srv://admin123:998978@cluster0.9rpjb.mongodb.net/admin123?retryWrites=true&w=majority
//const DATA_BASE = "admin123";
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

module.exports = mongo;//const DATA_BASE = "computer";
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
