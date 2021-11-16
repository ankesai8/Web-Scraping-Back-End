const express = require("express");
const cors = require("cors");

require("dotenv").config();

const mongo = require("./shared/mongo");
const scrapdata = require("./shared/scraped");
const productroute = require("./Routes/products");

//Server is about to start on port-> 4000

const PORT = process.env.PORT || 4000;

const app = express();

start = async()=>{
   
    try{
       
        

        await mongo.connect();

        await mongo.laptops.deleteMany({});
        
        await scrapdata();
        
        console.log("INSERTED DATA");
       
        //Reset DataBase for every 12 hours

        setInterval(async() => {
            await mongo.laptops.deleteMany({});
            await scrapdata(); 
            console.log("data reset DONE sucessfully");
        }, 43200*1000);
         
    //CORS allow every application
        app.use(cors());

    //express.json() parse data to json
        app.use(express.json());
       
        app.use((req,res, next)=>{

         console.log("Middleware LOG");
         
         next();
       })
       
       app.use("/products", productroute)

       app.listen(PORT,()=>{console.log(`server started at PORT: ${PORT}`);})
        


    }
    catch(err)
    {
        console.log(ERROR);
    }
    
}
start();
