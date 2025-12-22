const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
require("dotenv").config();

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/testlisting",async (req, res) => {
 
  let samplelisting = new Listing ({  // inserting
    title:"my new villa",
    description:"by the beach",
    price:1200,
    location:"goa",
    country:"india"
  })
     await samplelisting.save()
     console.log("response saved")
});

app.get("/")


app.listen("8080", (req, res) => {
  console.log("server is running on 8080");
});
