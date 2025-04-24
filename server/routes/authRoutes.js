import express from 'express';
import passport from 'passport';

const router = express.Router();


// Google Authentication
router.get('/google', passport.authenticate(`google`, { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/', /* or /dashboard*/
  failureRedirect: '/login'
}));

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/', /* or /dashboard*/
  failureRedirect: '/login'
}));

export default router;

