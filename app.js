const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const  https  = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended :true}));

// use static to send public files for html 
app.use("/public" ,express.static('public'));


app.get("/" , function(req ,res){
    res.sendFile(__dirname +"/signup.html")
})

app.post("/" ,function(req ,res){
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const email = req.body.email;
  
   const data={
       members: [ 
           {
               email_address : email,
               status : "subscribed",
               merge_fields : {
                   FNAME : firstName,
                   LNAME : lastName
               }
           }
       ]
   }
   let jsonData = JSON.stringify(data);
//    console.log(jsonData);

   const url = "https://us7.api.mailchimp.com/3.0/lists/853056c1b1"

   const options = {
       method : "POST",
       auth : "sadi:5509343e84a72eb43ef2d21a4334dece-us7"
   }
  const request = https.request(url ,options ,function(response){
      if (response.statusCode === 200){
        res.sendFile(__dirname +"/success.html")
      }else{
        res.sendFile(__dirname +"/failure.html")
      }
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        });
   })
   request.write(jsonData);
   request.end();
})


app.get("/f",function(req ,res){
    res.sendFile(__dirname +"/signup.html")
})
//   api key  = 5509343e84a72eb43ef2d21a4334dece-us7
// unique audience list id= 853056c1b1
 app.listen(3000 ,function(){
    console.log("server started at 3000");
})

