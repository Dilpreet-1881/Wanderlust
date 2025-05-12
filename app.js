if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
    console.log(process.env.SECRET);
}

const express = require("express")
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Review = require("./models/reviews.js");
const router = require("./routes/listingsRoute.js");
const filterRouter = require("./routes/filter.js");
const session = require("express-session");
// const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const userRoute = require("./routes/userRoute.js");
const { config } = require("dotenv");
// const store = MongoStore.create({
//     mongoUrl:MongoDbUrl,
//     crypto:{
//         secret:process.env.SECRET,
//     },
//     touchAfter:24*3600,
// });

const sessionOptions = {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

// let MongoDbUrl = process.env.ATLASDB_URL;
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let port = 8080;
main()
    .then(()=>{
        console.log("connection is successfully made to the database");
    })
    .catch((err)=>{
        console.log(err);
    })
app.engine("ejs",ejsMate);
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use((err,req,res,next)=>{
    res.send("something went wrong!");
});
app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.remove = req.flash("delete");
    res.locals.reviewDelete = req.flash("reviewDelete");
    res.locals.reviewAdded = req.flash("reviewAdded");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    res.locals.redirectUrl = req.session.redirectUrl;
    next();
});

app.get("/demouser",async(req,res)=>{
    let fakeuser = new User({
        email:"helloworld123@gmail.com",
        username:"@helloworld",
    });
    let registeredUser = await User.register(fakeuser,"password");
    console.log(registeredUser);
    res.send(registeredUser);
});

app.use("/",router);
app.use("/",userRoute);
app.use("/",filterRouter);
app.use((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in to perform action on our wanderlust!");
        res.redirect("/login");
    }
    next();
});

app.listen(port,()=>{
    console.log("Server is running at port: ",port);
});
