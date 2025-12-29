const express = require("express"); 
const router = express.Router({mergeParams:true}); // this is essential for req.params
const wrapAsync = require("../utils/wrapAsyn.js")  //for wrapasyn for middleware it aotomatically catches the error and passes it to the the middleware
// const { listingSchema } = require("../schema");  // server joi schema
const { reviewSchema } = require("../schema"); // review joi required for server side validation
const ExpressError = require("../utils/ExpressError.js") // for custom express error
const Review = require("../models/review.js") // reviw schema
const Listing = require("../models/listing.js")  // listing model

// validate review 
const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body); // html ke form mein review[comment] aise hai
    console.log(error);
    if (error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, msg);
    } else {
      next()
    }
  }


//Reviews
// post route   // route :=> /listings/:id/review
router.post("/",validateReview,wrapAsync(async(req,res) =>{
    let listing = await Listing.findById(req.params.id)  // id find karkar data  listing mein dal do
    const newReview = new Review(req.body.review); // taking as for name ="listing[title]" is written tho vha sa direct data le lega from html form
    
    listing.reviews.push(newReview)  // so that it become refernce for listing ,embedded ralatin
    await newReview.save();
    await listing.save();
    
    res.redirect(`/listings/${listing._id}`);
    }) )
    
    // REVIEWS:DELETE ROUTE
   router.delete("/listings/:id/review/:reviewId",wrapAsync(async(req,res) =>{
      let {id,reviewId} = req.params; // taking both review and listing id as rview must be deleted in listings also
    await Listing.findByIdAndUpdate(id, { //uss review ko pull matlab delete karo jiska id listing id sa mathch hota haisa match karta hai
      $pull: { reviews: new mongoose.Types.ObjectId(reviewId) } //So we convert string → ObjectId
    });  
    await Review.findByIdAndDelete(reviewId); // then delete that review
    
    res.redirect(`/listings/${id}`); // redirectin to show page again
    }))
    
    module.exports = router;