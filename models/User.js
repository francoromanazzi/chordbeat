const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(timestamp);

const User = mongoose.model('users', UserSchema);
module.exports = User;
