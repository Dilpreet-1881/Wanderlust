const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

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
async function initdb(){
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"680d171bf5e7d2959a3a1a7c"}));
    await Listing.insertMany(initdata.data);
}
initdb();