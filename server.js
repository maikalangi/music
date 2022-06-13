/////////////////////
// DEPENDENCIES
/////////////////////
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 3000, MONGODB_URL } = process.env;
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const { reset } = require("nodemon");

/////////////////////
//DATABASE
/////////////////////
// database connection,
mongoose.connect(process.env.MONGODB_URL);

// mongo status listeners
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

/////////////////////
// MODELS
/////////////////////
const PlaylistSchema = new mongoose.Schema({
    name: String,
    url: String,
    artist: String,
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

/////////////////////
// MIDDLEWARE
/////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/////////////////////
// ROUTES
/////////////////////

// test route
app.get("/", (req, res)=>{
    res.send("hello world");
});

// PLAYLIST INDEX ROUTE
app.get("/playlist", async (req, res) => {
    try {
        res.json(await Playlist.find({}));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST CREATE ROUTE
app.post("/playlist", async (req, res) => {
    try {
        res.json(await Playlist.create(req.body));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST DELETE ROUTE
app.delete("/playlist/:id", async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndRemove(req.params.id);
        res.send(deletedPlaylist);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST UPDATE ROUTE
app.put("/playlist/:id", async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedPerson);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
})

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));