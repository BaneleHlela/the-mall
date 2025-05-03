import express from 'express';
import passport from 'passport';

const router = express.Router();

// Trigger Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000', // or wherever you want to redirect after login
  })
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
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000', // or frontend route
  })
);

export default router;
