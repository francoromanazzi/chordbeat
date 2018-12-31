const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSongInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.artist = !isEmpty(data.artist) ? data.artist : '';
  data.yt = !isEmpty(data.yt) ? data.yt : '';
  data.tab = !isEmpty(data.tab) ? data.tab : '';

  // Title validation
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else if (!Validator.isLength(data.title, { max: 40 })) {
    errors.title = 'Title must be less than 40 characters';
  }

  // Artist validation
  if (Validator.isEmpty(data.artist)) {
    errors.artist = 'Artist field is required';
  } else if (!Validator.isLength(data.artist, { max: 40 })) {
    errors.artist = 'Artist must be less than 40 characters';
  }

  // YT validation
  if (Validator.isEmpty(data.yt)) {
    errors.yt = 'YT field is required';
  }

  // Tab validation
  if (Validator.isEmpty(data.tab)) {
    errors.tab = 'Tab field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
