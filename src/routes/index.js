//Este archivo enlaza a las páginas de tipo 1

const passport = require('passport');
const express = require('express');
const router = express.Router();

const { empty } = require("../lib/helpers");

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
router.post("/register", (req, res, next) => {
    const { username, email, password, confirm_password } = req.body;
    if (empty(username) || empty(email) || empty(password) || empty(confirm_password)) {
        req.flash("error_msg", "Por favor rellena todos los campos");
        return res.redirect("/register");
    }else {
        passport.authenticate("local.signup", {
            successRedirect : "/problems",
            failureRedirect : "/",
            failureFlash : true
        })(req, res, next);
    }
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