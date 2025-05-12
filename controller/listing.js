const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    let listingDatas = await Listing.find();
    res.render("index.ejs",{listingDatas});
};

module.exports.newForm = (req,res)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to perform action on our wanderlust!");
        res.redirect("/login");
    }
    res.render("new.ejs");
};

module.exports.addListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newdoc = req.body;
    let owner = req.user;
    newdoc.owner = owner;
    newdoc.image ={url,filename};
    await Listing.insertOne(newdoc);
    req.flash("success","Listing has been created successfully!");
    res.redirect("/listings");
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let doc = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    console.log(doc.owner);
    res.render("show.ejs",{doc});
};

module.exports.editForm = async(req,res)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to perform action on wanderlust!");
        res.redirect("/login");
    }
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // if(listing.owner != currentUser._id){
    //     req.flash("error","Permission is denied!");
    //     res.redirect(`/listings/${id}`);
    // }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
    res.render("edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let updated = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    await Listing.updateOne({_id:id},{$set : {title:updated.title,description:updated.description,price:updated.price,location:updated.location,country:updated.country,image:{url:url,filename:filename}}});
    // if(typeof req.file !== "undefined"){
    //     let url = req.file.path;
    //     let filename = req.file.filename;
    //     listing.image = {url:url,filename:filename};
    // }
    res.redirect("/listings");
};

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("delete","Listing is deleted!");
    res.redirect("/listings");
};