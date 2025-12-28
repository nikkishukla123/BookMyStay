// listing schema is defined here

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
// here the schema is set
const listingSchema = new Schema({
    title :{
        type:String,
        required:true
    },
    description: {
        type:String
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        }
    },
    price:{
        type:Number
    },
    location:{
        type:String,
    },
    country:{
        type:String
    },
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
});

// listing ka delete route isko call karega as a middleware
// listingSchema.post("findOneAndDelete",async(listing) => {  
//     console.log("🔥 MIDDLEWARE TRIGGERED", listing._id);
//     if(listing) {// if listing is matched delete review of that listing
//          await Review.deleteMany({_id:{ $in: listing.reviews}})  
//     }
//     console.log("🔥 MIDDLEWARE deleted", listing._id);
// });

listingSchema.post("findOneAndDelete", async function (listing) {
    if (!listing) return;
  
    if (!listing.reviews || listing.reviews.length === 0) {
      console.log("No reviews to delete");
      return;
    }
  
    console.log("🔥 MIDDLEWARE TRIGGERED", listing._id);
  
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
  
    console.log("🔥 REVIEWS DELETED");
  });
  

const Listing = mongoose.model("Listing",listingSchema);

module.exports= Listing;  // exporting it to the main app file