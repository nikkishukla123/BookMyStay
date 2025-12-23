const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");//acessing method override


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Parse form data (POST request data from HTML forms)
app.use(methodOverride("_method")); // to convert patch requests

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

// new route
app.get("/listings/new", (req,res) => {
 res.render("listings/form.ejs")
})

// CREATE ROUTE :MAKE NEW LIST BY SUBMITTING FORM BY POST REQUEST BUT FIRST GET FROM 
app.post("/listings",async (req,res) => {
  // let {title,description,image,price,country,location} = req.body;
  const newlisting = new Listing(req.body.listing);  // taking the 
  await newlisting.save();  // save hone ke baad redirect kardo
  res.redirect("/listings");
})



//show route: read operation: get list show in deatail by id
app.get("/listings/:id", async (req,res) => {     //Express route handlers always receive (req, res) in this order.
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing}); 
})


// edit route
app.get("/listings/:id/edit",async (req,res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing}); 
  
} )

app.put("/listings/:id", async (req,res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing},  { runValidators: true, new: true });  // usi list ko update kar rahe hai n isliye no const ,let vaigera
  console.log(Listing);
  res.redirect(`/listings/${id}`);
})
// DELETE ROUTE
app.delete("/listings/:id" ,async(req,res) =>{
  let {id} = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id)
  console.log("deleted sucessfully",deletedlisting)
  res.redirect("/listings")
})



app.listen("8080", (req, res) => {
  console.log("server is running on 8080");
});
