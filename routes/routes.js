const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('index');
});

router.get('/mahasiswa', (req, res) => {
    res.send("All Students");
});

router.get("/add", (req, res) => {
    res.render('addStudent');
})

module.exports = router;