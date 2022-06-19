/////////////////////
// DEPENDENCIES
/////////////////////
const {Router} = require('express');
const express = require('express');
const Playlist = require('../models/Playlist');

// Initialize
const router = express.Router();

/////////////////////
// ROUTES
/////////////////////

// PLAYLIST INDEX ROUTE
router.get("/playlist", async (req, res) => {
    try {
        res.json(await Playlist.find({}));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST CREATE ROUTE
router.post("/playlist", async (req, res) => {
    try {
        res.json(await Playlist.create(req.body));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST DELETE ROUTE
router.delete("/playlist/:id", async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndRemove(req.params.id);
        res.send(deletedPlaylist);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST UPDATE ROUTE
router.put("/playlist/:id", async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedPerson);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
})

module.exports = router;