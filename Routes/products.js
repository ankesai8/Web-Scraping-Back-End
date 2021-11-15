const route = require("express").Router();
const db = require("../shared/mongo");

//to get all products

route.get("/", async(req,res)=>{
    try{
        const data = await db.laptops.find().toArray();
        res.send(data);

    }
    catch(err)
    {
        res.status(500).send(" INTERNAL Server error")
    }
})

//to get products by searching with id

route.get("/id", async(req,res)=>{
    try{
        //regular exp to query based on the first letters
        let search = new RegExp(`^`+req.params.id,`i`);
       
        const data = await db.laptops.find({title:search}).toArray();
        res.send(data);

    }
    catch(err)
    {
        res.status(500).send("INTERNAL Server error")
    }
})


module.exports = route;