const Joi = require("joi");  // joi comes between of server and real database as a security

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    price: Joi.number().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().allow("", null)
  }).required()
});



module.exports.reviewSchema = Joi.object({  
  review: Joi.object({   // first review object is required
    rating: Joi.number().required(),  // rating and comment is required
    comment: Joi.string().required(),
   
  }).required() 
})

                                        
module.exports.listingSchema = listingSchema;
// 🧠 Mental Model (Yaad rakhne ka trick)
// Form Validation   → UX (user help)
// Joi Validation    → Security + Logic
// Mongoose Schema   → Data integrity

