const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema(
    {
        name: String,
        url: String,
        artist: String,
    }
);

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;