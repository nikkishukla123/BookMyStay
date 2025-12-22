const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
require("dotenv").config();
// const methodOverride = require("method-override");//acessing method override


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Parse form data (POST request data from HTML forms)
// app.use(methodOverride("_method")); // to convert patch requests

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// app.get("/testlisting",async (req, res) => {  // inserting sample data
 
//   let samplelisting = new Listing ({  // inserting
//     title:"my new villa",
//     description:"by the beach",
//     price:1200,
//     location:"goa",
//     country:"india"
//   })
//      await samplelisting.save()
//      console.log("response saved")
// });

// create: listing all files
app.get("/listings", async (req,res) => {     //Express route handlers always receive (req, res) in this order.
    let lists =  await Listing.find();
    res.render("listings/index.ejs",{lists});   //Express renders views relative to views/, including subfolders.
})

// CREATE ROUTE :MAKE NEW LIST BY SUBMITTING FORM BY POST REQUEST BUT FIRST GET FROM 
app.get("/listings/new", (req,res) => {
 res.render("listings/form.ejs")
})



//show route: read operation: get list show in deatail by id
app.get("/listings/:id", async (req,res) => {     //Express route handlers always receive (req, res) in this order.
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing}); 
})







//edit
// app.get("/listings/:id/edit",async (req,res) => {
//   let {id} = req.params;
//   const post = await Listing.findById(id);
//   res.render("listings/edit.ejs",{post}); 
  
// } )
app.listen("8080", (req, res) => {
  console.log("server is running on 8080");
});
