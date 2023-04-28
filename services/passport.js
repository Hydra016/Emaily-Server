require("dotenv/config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.NODE_ENV === "production"
          ? process.env.GOOGLE_CLIENT_ID_PROD
          : process.env.GOOGLE_CLIENT_ID_DEV,
      clientSecret:
        process.env.NODE_ENV === "production"
          ? process.env.GOOGLE_CLIENT_SECRET_PROD
          : process.env.GOOGLE_CLIENT_SECRET_DEV,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "145331421812347",
      clientSecret: "770d51bf1e34640492d830376c16d927",
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
    }
  )
);
