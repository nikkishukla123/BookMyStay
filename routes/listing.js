// as this are on other folder thus .. parent directory ke andar jao pehle
const express = require("express"); 
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js")  //for wrapasyn for middleware it aotomatically catches the error and passes it to the the middleware
const { listingSchema } = require("../schema");  // server joi schema
const ExpressError = require("../utils/ExpressError.js") // for custom express error
const Listing = require("../models/listing.js")  // listing schema


// validate listing
const validateListing = (req,res,next)=> {  // making it as a middleware to handle server error
    // jab kisi rout ke upar call jaeyga pehle validate listing then bki ka async ka kaam
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, msg);
    } else {
      next()
    }
  }



// index route: showing all files
router.get("/",wrapAsync(async (req,res) => {     //Express route handlers always receive (req, res) in this order.
    let lists =  await Listing.find();
    res.render("listings/index.ejs",{lists});   //Express renders views relative to views/, including subfolders.
}))

// New route: add new listing
router.get("/new", (req,res) => { // listing ke jagah-> / -> /listing/new
 res.render("listings/form.ejs")
})

// CREATE ROUTE :MAKE NEW LIST BY SUBMITTING FORM BY POST REQUEST BUT FIRST GET FROM
router.post("/",validateListing,wrapAsync(async (req,res) => {
  // let {title,description,image,price,country,location} = req.body;
  const newlisting = new Listing(req.body.listing);
  // taking as for name ="listing[title]" is written tho vha sa direct data le lega
  await newlisting.save();  // save hone ke baad redirect kardo
  res.redirect("/listings");
}) )

//show route: read operation: get list show in deatail by id
router.get("/:id", wrapAsync(async (req,res) => { // -> /listing/:id     //Express route handlers always receive (req, res) in this order.
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing}); 
  }) )

  // edit route
router.get("/:id/edit",wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing}); 
    
  } ) )
  //update route
  router.put("/:id",validateListing,wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing},  { runValidators: true, new: true });  // usi list ko update kar rahe hai n isliye no const ,let vaigera
    console.log(Listing);
    res.redirect(`/listings/${id}`);
  }))
  // DELETE ROUTE
  router.delete("/:id" ,wrapAsync(async(req,res) =>{
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id)
    console.log("deleted sucessfully",deletedlisting)
    res.redirect("/listings")
  }))

  module.exports = router;