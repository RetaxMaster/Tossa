//Este archivo enlaza a las páginas de tipo 1

const express = require('express');
const router = express.Router();

// Login
router.get("/", (req, res) => {
    const data = req.body;
    data.page = "login";
    res.render("page1/login", { data });
});

//Register
router.get("/register", (req, res) => {
    const data = req.body;
    data.page = "register";
    res.render("page1/register", { data });
});

//Recover
router.get("/recover", (req, res) => {
    const data = req.body;
    data.page = "recover";
    res.render("page1/recover", { data });
});

//Reset
router.get("/reset", (req, res) => {
    const data = req.body;
    data.page = "reset";
    res.render("page1/reset", { data });
});

// POST

// Login
router.post("/", (req, res) => {
    res.send("do something...");
});

//Register
router.post("/register", (req, res) => {
    res.send("do something...");
});

//Recover
router.post("/recover", (req, res) => {
    res.send("do something...");
});

//Reset
router.post("/reset", (req, res) => {
    res.send("do something...");
});

module.exports = router;