const mongoose = require("mongoose");
const initData = require("./data.js"); // taking data
require("dotenv").config();
const Listing = require("../models/listing.js")  // vo dura folder mein ye dusra folder mein isliye doo dot

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDB = async () =>{  // a function to first delete if there is any 
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);//then insert the data from data.js
   console.log("data was initialized");
}
initDB()