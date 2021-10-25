const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');
router.use('/auth', authRoutes);

const albumRoutes = require('./album');
router.use('/album', albumRoutes);

const artistRoutes = require('./artist');
router.use('/artist', artistRoutes);

module.exports = router;