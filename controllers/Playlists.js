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
router.get("/", async (req, res) => {
    try {
        res.json(await Playlist.find({}));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST CREATE ROUTE
router.post("/", async (req, res) => {
    try {
        res.json(await Playlist.create(req.body));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST DELETE ROUTE
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Playlist.findByIdAndRemove(req.params.id));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST UPDATE ROUTE
router.put("/:id", async (req, res) => {
    try {
        res.json(await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

// PLAYLIST SHOW ROUTE
router.get('/:id', async (req, res) => {
    try {
        res.json(await Playlist.findById(req.params.id))
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

module.exports = router;