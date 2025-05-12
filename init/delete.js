const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
    .then(()=>{
        console.log("connection is successfully made to the database");
    })
    .catch((err)=>{
        console.log(err);
    })
async function del(){
    await Review.deleteMany({});
}
del();