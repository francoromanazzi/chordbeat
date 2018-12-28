const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const playlists = require('./routes/api/playlists');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use routes
app.use('/api/users', users);
app.use('/api/playlists', playlists);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
