const mongoose = require("mongoose");
const Review = require("./reviews");
const {Schema} = mongoose;

const listingSchema = new mongoose.Schema({
    title : String,
    description : String,
    image : {
        url:String,
        filename:String,
    },
    price : Number,
    location : String,
    country : String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category : {
        type: String,
        enum : ["trending","farms","castels","mountaincities","domes","arctic","boats","camping","swimmingpools","OMG","rooms"],
    }
});

// listingSchema.post("findOneAndDelete",async(listing)=>{
//     if(listing){
//         await Review.deleteMany({_id:{$in:listing.reviews}});
//     }
// });

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;