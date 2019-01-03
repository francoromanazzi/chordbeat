const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSongInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.artist = !isEmpty(data.artist) ? data.artist : '';

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
