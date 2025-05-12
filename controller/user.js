const User = require("../models/users");

module.exports.signupPage = (req,res)=>{
    res.render("signUp.ejs");
};

module.exports.signupUser = async(req,res)=>{
    let {username:username,email:email,password:password} = req.body;
    let newUser = new User({
        username:username,
        email:email,
    });
    await User.register(newUser,password);
    console.log("new user has been saved!");
    req.login(newUser,(err)=>{
        if(err){
            console.log(err);
        }
        req.flash("success","Welcome,to wanderlust!");
        res.redirect("/listings");
    });
};

module.exports.loginPage = (req,res)=>{
    res.render("login.ejs");
};

module.exports.loginUser = (req,res)=>{
    
    req.flash("success","Welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    console.log(req.user);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            console.log("error has been occured");
            return next(err)
        }
        req.flash("success","you are successfully logged out!")
        res.redirect("/login");
        console.log(req.user);
    });
};