const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const flash = require("connect-flash");
const listingController = require("../controller/listing.js");
const reviewController = require("../controller/reviews.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.get("/",(req,res)=>{
    res.send("hello i am root");
});
router.get("/listings",listingController.index);
router.get("/listings/new",listingController.newForm);
router.post("/listings",upload.single('file'),listingController.addListing);
// // router.post("/listings",upload.single('file'),(req,res)=>{
//     res.send(req.file);
// });
// show route
router.get("/listings/:id",listingController.showListing);
router.get("/listings/:id/edit",listingController.editForm);
router.patch("/listings/:id",upload.single('file'),listingController.updateListing);
router.delete("/listings/:id",listingController.deleteListing);
router.post("/listings/:id/reviews",reviewController.createReview);
router.delete("/listings/:listingId/reviews/:reviewId",reviewController.deleteReview);

module.exports = router;