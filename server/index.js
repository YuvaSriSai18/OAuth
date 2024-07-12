const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

dotenv.config();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// Mongoose Connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => {
    console.log(`Error Occurred : ${err}`);
  });

// Setup Session
app.use(
  session({
    secret: "75692834uiwhfjdbgiasdjn9384iuyr92348fherisgh458",
    resave: false,
    saveUninitialized: true,
  })
);

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const displayName = profile.displayName.split(" | ")[0] || profile.displayName;
        const rollNo = profile.displayName.split(" | ")[1] || "";
        const photoUrl = profile.photos[0].value;
        const role = assignRole(email);
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName.split(' | ')[0];

        const user = await User.findOneAndUpdate(
          { email },
          {
            email,
            displayName,
            photoUrl,
            rollNo,
            role,
            firstName,
            lastName
          },
          { new: true, upsert: true } // `upsert: true` will create a new document if no match is found
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize Google Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get('/login/success',async (req,res)=>{
    // console.log('request',req.user)
    // res.send(req.user);

    if(req.user){
        res.status(200).json({message:"User Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get('/logout',(req,res,next)=>{
    req.logOut(function(err){
        if(err){
            return next(err)
        }
        res.redirect('http://localhost:3000/login')
    })
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Functions

const assignRole = (email) => {
  const domain = email.split("@")[1];
  if (domain !== "srmap.edu.in") {
    return "Unknown";
  }
  const localPart = email.split("@")[0];
  if (localPart.includes("_")) {
    return "Student";
  } else if (localPart.includes(".")) {
    return "Faculty";
  } else {
    return "Unknown";
  }
};
