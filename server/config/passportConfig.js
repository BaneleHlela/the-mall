const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/userModel.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });

      if (!user) {
        const newUserData = {
          facebookId: profile.id,
          name: profile.name ? `${profile.name.givenName} ${profile.name.familyName}` : '', // safer
        };

        if (profile.emails && profile.emails.length > 0) {
          newUserData.email = profile.emails[0].value;
        }

        if (profile.photos && profile.photos.length > 0) {
          newUserData.avatar = profile.photos[0].value; // optional if you want to save profile picture
        }

        user = await User.create(newUserData);
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));


export default passport;
