// server/auth/google.ts

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
function(profile, done) {
    console.log(profile)
  // You can handle user creation or retrieval here
  return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
    console.log(user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log(user)
  done(null, user);
});
