const db = require("./mongo");
const axios = require("axios");
const cheerio = require("cheerio");


scrapdata = ()=>{
  
  //------------------------------------------->>>>>>>>>>>>>>>  
  let Amazon =[];
   //Fetching DATA FROM  Amazon web
   axios.get("https://www.amazon.in/s?k=laptops&i=computers&bbn=22963797031&rh=n%3A22963797031%2Cp_89%3AASUS%7CLenovo%7CMicrosoft%2Cp_72%3A1318476031&s=date-desc-rank&dc&qid=1636969630&rnid=1318475031&ref=sr_nr_p_72_1")
   .then(res=>{

   const $ = cheerio.load(res.data);
    let count =0;


  $(".s-asin").each((index,element)=>{
      if(count <10)
      {
      let image = $(element).find(".aok-relative").children().attr("src");
      let title = $(element).find("span.a-text-normal").text();
      let rating = $(element).find(".a-icon-star-small").children().text();
      let price = $(element).find("span.a-text-price").children("span.a-offscreen").text();
      let finalprice = $(element).find("span.a-price-whole").text();
      //to push only not null elements
      if(title !=="" || price !==""||finalprice!=="")
      {
        Amazon[index] = {image,title,rating,price,finalprice};
        count++;
      }
      }
  })
  
  db.laptops.insertMany(Amazon)
  })
  .catch(err=>console.log(err));
  

  //------------------------------------------->>>>>>>>>>>>>>> 
  //Fetching DATA FROM  Flipkart web
   let flipkart =[];
   axios.get("https://www.flipkart.com/search?q=laptop&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&sort=recency_desc")
   .then(res=>{
    
       const $ = cheerio.load(res.data);
     let count =0;
     $("._1AtVbE").each((index,element)=>{
        
        
            if(count <10)
            {
               let image = $(element).find("img._396cs4 ").attr("src");
               let title = $(element).find("div._4rR01T").text();
               let rating = $(element).find("div._3LWZlK").text();
               let price = $(element).find("div._3I9_wc").text();
               let finalprice = $(element).find("div._30jeq3").text();
               //to push only not null elements
               if(title !=="" || price !==""||finalprice!=="")
              {
                flipkart[count]={image,title,rating,price,finalprice}
                count++;
              }
            }
     })
     db.laptops.insertMany(flipkart)
   })
   .catch(err=>console.log(err));

   //------------------------------------------->>>>>>>>>>>>>>> 
   //Fetching DATA FROM  SnapDeal web

   let snapdeal =[];
axios.get("https://www.snapdeal.com/search?keyword=laptops&santizedKeyword=laptops&catId=57&categoryId=57&suggested=false&vertical=p&noOfResults=20&searchState=k3%3Dtrue%7Ck5%3D0%7Ck6%3D0%7Ck7%3D%2F%2F8f%7Ck8%3D0&clickSrc=searchOnSubCat&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rec&q=Brand%3ALenovo%5EHP%7CMemoryRam_s%3A16%20GB%7CPrice%3A69156%2C107690%7C#bcrumbSearch:laptops|bcrumbLabelId:57")
   .then(res=>{

      const $ = cheerio.load(res.data);


      let count =0;
    $(".favDp").each((index,element)=>{
        if(count <10)
        {
           let image = $(element).find(".picture-elem source").attr("srcset");
           let title = $(element).find("p.product-title").text();
           let rating = "NA";
           let price = $(element).find("span.product-desc-price").text();
           let finalprice = $(element).find("span.product-price").text();
           //to push only not null elements
           if(title !=="" || price !==""||finalprice!=="")
          {
            snapdeal[count]={image,title,rating,price,finalprice}
            count++;
          }
        }
    })
    db.laptops.insertMany(snapdeal)
  })
  .catch(err=>console.log(err));
  
 
}


module.exports = scrapdata;
