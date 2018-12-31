const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePlaylistInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  // Title validation
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  } else if (!Validator.isLength(data.title, { max: 30 })) {
    errors.title = 'Title must be less than 30 characters';
  }

  // Description validation
  if (!Validator.isLength(data.description, { max: 100 })) {
    errors.description = 'Description must be less than 100 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
