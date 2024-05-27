const express = require('express');
const router = express.Router();
const passport = require('passport')
const mainController = require('../controllers/main.controller');

router.get('/', mainController.index);

router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), mainController.authSteam);

router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), mainController.authSteamReturn);

router.get('/api/logout', mainController.destroySession)

router.get('/api/delete', mainController.deleteAccount)

module.exports = router;