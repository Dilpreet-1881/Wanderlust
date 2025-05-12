const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Permisson is not granted!");
        let {id} = req.params;
        res.redirect(`/listings/${id}`);
    }
    let {id} = req.params;
    let {content:content,rating:rating} = req.body;
    let listing = await Listing.findById(id);
    let currentUser = req.user._id;
    let newReview = new Review({
        content:content,
        rating:rating,
        author:currentUser,
    });
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("reviewAdded","Review has been added successfully!");
    console.log("review has been added");
    // res.send("review has been added successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async(req,res)=>{
    if(!req.isAuthenticated){
        req.flash("error","Permission is denied!");
        res.redirect("/listings")
    }
    let {listingId,reviewId} = req.params;

    await Listing.findByIdAndUpdate(listingId,{$pull:{reviews:reviewId}});
    await Review.deleteOne({_id:reviewId});
    console.log("review has been deleted from Review folder !");
    req.flash("reviewDelete","Review has been deleted!");
    res.redirect(`/listings/${listingId}`);
};