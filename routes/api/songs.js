const express = require('express');
const router = express.Router();
const ugs = require('ultimate-guitar-scraper');
const isEmpty = require('../../validation/is-empty');

// @route   GET api/songs/test
// @desc    Tests songs route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Songs works' }));

// @route   POST api/songs
// @desc    Get chords for a song
// @access  Public
router.post('/', (req, res) => {
  const { search } = req.body;

  ugs.search(
    {
      query: search,
      page: 1,
      type: ['Chords', 'Tab']
    },
    (err, tabs) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        if (isEmpty(tabs))
          return res.status(404).json({ error: 'No tab found' });

        // Get URL for the best rated tab
        const bestTab = tabs.reduce((tab1, tab2) =>
          tab1.rating > tab2.rating ||
          (tab1.numberRates > tab2.numberRates * 1.5 && tab1.rating >= 4.2) ||
          (tab1.type === 'Chords' && tab2.type === 'Tab')
            ? tab1
            : tab2
        );

        ugs.get(bestTab.url, (err, tab) => {
          if (err) {
            res.status(400).json({ err });
          } else {
            res.json(tab);
          }
        });
      }
    }
  );
});

module.exports = router;
