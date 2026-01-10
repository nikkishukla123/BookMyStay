const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js")  // listing schema
// const Review = require("./models/review.js") // reviw schema
const port = process.env.PORT || 8080;
const path = require("path");
require("dotenv").config(); //env
const methodOverride = require("method-override");//acessing method override
const ejsmate = require("ejs-mate"); // ejs mate rquired
const wrapAsync = require("./utils/wrapAsyn.js")  //for wrapasyn for middleware it aotomatically catches the error and passes it to the the middleware
const ExpressError = require("./utils/ExpressError.js") // for custom express error
// const { listingSchema } = require("./schema");  // server joi schema
// const { reviewSchema } = require("./schema"); // review joi required for server side validation
const listings = require("./routes/listing.js"); // listing routes
const reviews = require("./routes/review.js"); // reviw routes


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true })); // Parse form data (POST request data from HTML forms)
app.use(methodOverride("_method")); // to convert patch requests
app.engine("ejs",ejsmate);



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



app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings",listings); // from this line we get entire listing route
app.use("/listings/:id/review",reviews)






// middleware
app.use((req, res, next) => {   //  for handling custom express error
  next(new ExpressError(404, "Page Not Found"));
});


app.use((err,req,res,next) => {  // this is error handling middlewar // for form validation
  console.log("-----ERROR------")
  let {status= 500,message="some error ocurred"}  = err; // taking status and message and sending on client side, and setting default value of status 
  // res.status(status).send(message); // so if undefined for any error than default 500 and also default msg is set
       //  next(err)
       res.status(status).render("listings/error.ejs", { message });
})



app.listen("8080", (req, res) => {
  console.log(`Server running on port ${port}`);
});
