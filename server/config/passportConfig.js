import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20";
import { v4 as uuidv4 } from 'uuid'; // we'll use this to generate a random password
import bcrypt from 'bcryptjs';       // you already use bcryptjs for hashing

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/UserModel.js';

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


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Extract first and last name from profile.displayName
        const nameParts = profile.displayName?.split(' ') || ['Unknown', 'User'];
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || 'User'; // in case no last name

        // Generate a random password and hash it
        const randomPassword = uuidv4(); // random string
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0].value,
          firstName,
          lastName,
          password: hashedPassword,
          avatar: profile.photos?.[0].value,
        });
        // generateTokenAndSetCookie(res, user._id);
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
        const firstName = profile.name?.givenName || 'Unknown';
        const lastName = profile.name?.familyName || 'User';

        // Generate and hash a random password
        const randomPassword = uuidv4();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newUserData = {
          facebookId: profile.id,
          firstName,
          lastName,
          password: hashedPassword,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        };

        user = await User.create(newUserData);
        // generateTokenAndSetCookie(res, user._id);
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));



export default passport;
