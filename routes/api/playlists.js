const express = require('express');
const router = express.Router();
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');

// Load Input Validation
const validatePlaylistInput = require('../../validation/playlist');
const validateSongInput = require('../../validation/song');

// Load Playlist model
const Playlist = require('../../models/Playlist');

// @route   GET api/playlists/test
// @desc    Tests playlists route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Playlists works' }));

// @route   POST api/playlists
// @desc    Create empty playlist
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePlaylistInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { title, description } = req.body;

    const newPlaylist = new Playlist({
      user: req.user.id,
      title,
      description: isEmpty(description) ? '' : description,
      songs: []
    });

    newPlaylist.save().then(playlist => res.json(playlist));
  }
);

// @route   GET api/playlists
// @desc    Get all playlists
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Playlist.find()
      .then(playlists => {
        if (isEmpty(playlists))
          return res
            .status(404)
            .json({ playlistsnotfound: 'No playlists found for that user' });

        const playlistsFromUser = playlists.filter(
          playlist => playlist.user.toString() === req.user.id
        );
        res.json(playlistsFromUser);
      })
      .catch(err =>
        res
          .status(404)
          .json({ playlistsnotfound: 'No playlists found for that user' })
      );
  }
);

// @route   GET api/playlists/:playlistID
// @desc    Get playlist
// @access  Private
router.get(
  '/:playlistID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Playlist.findById(req.params.playlistID)
      .then(playlist => {
        // Check playlist owner
        if (playlist.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'This playlist is not yours' });
        }

        if (!playlist) {
          res.status(404).json({ playlistnotfound: 'No playlist found' });
        } else {
          res.json(playlist);
        }
      })
      .catch(err =>
        res.status(404).json({ playlistnotfound: 'No playlist found' })
      );
  }
);

// @route   DELETE api/playlists/:playlistID
// @desc    Delete playlist
// @access  Private
router.delete(
  '/:playlistID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Playlist.findById(req.params.playlistID)
      .then(playlist => {
        // Check playlist owner
        if (playlist.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'This playlist is not yours' });
        }

        // Delete
        playlist.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ playlistnotfound: 'No playlist found' })
      );
  }
);

// @route   POST api/playlists/:playlistID
// @desc    Add song to playlist
// @access  Private
router.post(
  '/:playlistID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSongInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { title, artist, yt, tab } = req.body;

    const newSong = { title, artist, yt, tab };

    Playlist.findById(req.params.playlistID)
      .then(playlist => {
        // Check playlist owner
        if (playlist.user.toString() !== req.user.id) {
          errors.notauthorized = 'This playlist is not yours';
          return res.status(401).json({ errors });
        }

        // Add song
        playlist.songs.push(newSong);

        // Save
        playlist.save().then(playlist => res.json(playlist));
      })
      .catch(err => {
        errors.playlistnotfound = 'No playlist found';
        return res.status(404).json({ errors });
      });
  }
);

// @route   DELETE api/playlists/:playlistID/:songID
// @desc    Delete song from playlist
// @access  Private
router.delete(
  '/:playlistID/:songID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Playlist.findById(req.params.playlistID)
      .then(playlist => {
        // Check playlist owner
        if (playlist.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'This playlist is not yours' });
        }

        // Check to see if song exists in the playlist
        if (
          playlist.songs.filter(
            song => song._id.toString() === req.params.songID
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = playlist.songs
          .map(song => song._id.toString())
          .indexOf(req.params.songID);

        // Splice comment out of array
        playlist.songs.splice(removeIndex, 1);

        playlist.save().then(playlist => res.json(playlist));
      })
      .catch(err =>
        res.status(404).json({ playlistnotfound: 'No playlist found' })
      );
  }
);

module.exports = router;
