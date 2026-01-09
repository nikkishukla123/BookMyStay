const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
app.use(cookieParser("secretcode"));


app.get("/users", (req,res) => {
    res.send("hello")
   })
// if trying to tamper cookie it will print false and not print original value
 app.get("/getsignedcookies", (req,res) => { 
 res.cookie("hello","tatabyebye",{signed:true}) // so some code is attached to it
 res.send("signed cookie sent")
    })
app.get("/verify",(req,res) => {  
    console.log(req.signedCookies)
    res.send("verified ab bhaag")
});


app.get("/getcookies", (req,res) => { 
   res.cookie("greet","namste") // name value pair
   res.cookie("madein","india")
   res.send("sent some  cookies")
   })





   app.get("/", (req,res) => { 
   console.dir(req.cookies)// to make this possible use parser
    res.send("i am root")
    })




    