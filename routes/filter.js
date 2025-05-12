const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

router.get("/listings/filters/:category",async(req,res)=>{
    let {category} = req.params;
    let listingDatas = await Listing.find({category:category});
    res.render("index.ejs",{listingDatas});
});
router.get("/listings/search",async(req,res)=>{
    let listingData = req.query;
    let doc = await Listing.find({title:listingData});
    res.render("show.ejs",{doc}); 
});
module.exports = router;