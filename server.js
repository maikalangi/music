/////////////////////
// DEPENDENCIES
/////////////////////
const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const Playlist = require('./models/Playlist');
const controller = require('./controllers/Playlists');

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
// MIDDLEWARE
/////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/////////////////////
// ROUTES/CONTROLLER
/////////////////////

// controller
app.use('/playlist', controller)

// test route
app.get("/", (req, res)=>{
    res.send("hello world");
});

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));