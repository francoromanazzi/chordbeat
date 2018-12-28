const express = require('express');
const router = express.Router();

// @route   GET api/playlists/test
// @desc    Tests playlists route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Playlists works' }));

module.exports = router;
