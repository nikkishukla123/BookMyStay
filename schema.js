const Joi = require("joi");  // joi comes between of server and real database as a security
 
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    price: Joi.number().required().min(0),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().allow("", null)
  }).required()
});
// 🧠 Mental Model (Yaad rakhne ka trick)
// Form Validation   → UX (user help)
// Joi Validation    → Security + Logic
// Mongoose Schema   → Data integrity


// 👉 Teen layers = Professional Backend

// 🎯 Interview Answer (Perfect)

// “Frontend validation improves user experience but can be bypassed.
//  Mongoose validation runs at database level, which is too late.
//  Joi is used to validate request data before it reaches the database, 
// improving security, performance, and error handling.”