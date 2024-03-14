// server/routes/auth.ts

import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to React client or send token
    res.redirect('/landing'); // Redirect to React client home page
  });

export default router;
