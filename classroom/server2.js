const express = require("express");
const app = express();
const session = require("express-session"); // useing expression to create session for stateless http
const flash = require("connect-flash");
app.use(flash()); // flash middleware
const path = require("path")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");



app.use( //by this session id is generated in browser
    session({
      secret: "mySecretKey",   // used to sign the session ID
      resave: false,           // don’t save session if nothing changed
      saveUninitialized: false // don’t create empty sessions
    })
  );
  
  app.get("/register", (req,res) => {
    let {name = "anonymous"} = req.query;  ///register?name=nikki if not write anything than anonymous will written
    req.session.name = name;  // here we use again sesion to get name of entered query
    req.flash("success","user registered successfully");// key:message
    res.redirect("/hello") // then redirecting to print hello with name
   })


   app.get("/hello", (req,res) => {
    res.render("page.ejs",{name:req.session.name,msg:req.flash('success')}); // acessing msg with key success
    // res.send(`hello ${req.session.name}`)
   })




//  app.get("/reqcount",(req,res) => {
//     if(req.session.count) {  // to count the request sent session is used
//              req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times` )
//  }) 

app.get("/test", (req,res) => {
    res.send("test successfull")
   })

   app.listen("8080", (req, res) => {
    console.log("server is running on 8080");
  });