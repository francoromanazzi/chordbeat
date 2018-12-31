const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

// Create Schema
const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  songs: [
    {
      title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      yt: {
        type: String,
        required: true
      },
      tab: {
        type: String,
        required: true
      }
    }
  ]
});

PlaylistSchema.plugin(timestamp);

const Playlist = mongoose.model('playlists', PlaylistSchema);
module.exports = Playlist;
