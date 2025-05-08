import express from 'express';
import passport from 'passport';
import { generateTokenAndSetCookie } from '../config/generateTokenAndSetCookie.js';

const router = express.Router();

// Trigger Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate token and set the cookie
    generateTokenAndSetCookie(res, req.user._id);

    // Redirect after successful authentication
    res.redirect("http://localhost:3000"); 
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Current user route
router.get('/current-user', (req, res) => {
  res.send(req.user);
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login", session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate token and set the cookie
    generateTokenAndSetCookie(res, req.user._id);

    // Redirect after successful authentication
    res.redirect("http://localhost:3000"); 
  }
);

export default router;
