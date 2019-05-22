//Este archivo enlaza a las páginas de tipo 1

const passport = require('passport');
const express = require('express');
const router = express.Router();

const { empty, sendMail } = require("../lib/helpers");
const { isNotLoggedIn, isLoggedIn } = require('../lib/auth');
const { getRandomString } = require("../lib/helpers");
const config = require("../lib/config");
const RecoverCode = require("../models/RecoverCodes");
const User = require("../models/Users");

// Login
router.get("/", isNotLoggedIn, (req, res) => {
    const data = req.body;
    data.page = "login";
    res.render("page1/login", { data });
});

//Register
router.get("/register", isNotLoggedIn, (req, res) => {
    const data = req.body;
    data.page = "register";
    res.render("page1/register", { data });
});

//Recover
router.get("/recover", isNotLoggedIn, (req, res) => {
    const data = req.body;
    data.page = "recover";
    res.render("page1/recover", { data });
});

//Reset
router.get("/reset/:code", isNotLoggedIn, async (req, res) => {
    const data = {};
    const { code } = req.params;
    const RecoverData = await RecoverCode.findOne({ code : code});

    if (RecoverData) {
        data.code = code;
        data.page = "reset";
        res.render("page1/reset", { data });
    }
    else {
        res.redirect("/recover");
    }
});

//Logout
router.get("/logout", isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect("/");
});

// POST

// Login
router.post("/", isNotLoggedIn, passport.authenticate("local.signin", {
    successRedirect : "/problems/all",
    failureRedirect : "/",
    failureFlash : true
}));

//Register
router.post("/register", isNotLoggedIn, (req, res, next) => {
    const { username, email, password, confirm_password } = req.body;
    if (empty(username) || empty(email) || empty(password) || empty(confirm_password)) {
        req.flash("error_msg", "Por favor rellena todos los campos");
        return res.redirect("/register");
    }else {
        passport.authenticate("local.signup", {
            successRedirect : "/problems",
            failureRedirect : "/register",
            failureFlash : true
        })(req, res, next);
    }
});

//Recover
router.post("/recover", isNotLoggedIn, async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email : email});
    console.log(user);
    
    if (user) {
        const code = getRandomString(10);
        const url = config.url + "reset/" + code;

        try {
            sendMail(email, "Reestablecer contraseña", `¡Hola! Hemos visto que deseas reestablecer tu contraseña, puedes hacerlo a través del siguiente enlace: <a href="${url}">${url}</a>`);
            const recover = new RecoverCode({ code, email });
            await recover.save();
            req.flash("success_msg", "Te hemos enviado un correo de recuperación.");
        } catch (e) {
            console.log("Error: ", e.message);
            req.flash("error_msg", "Surgió un error, por favor contacte con el administrador.");
        }
    }
    else {
        req.flash("error_msg", "Este email no está registrado.");
    }

    res.redirect("/recover");
});

//Reset
router.post("/reset", isNotLoggedIn, async (req, res) => {
    const { password } = req.body;
    const { code } = req.body;
    
    const RecoverData = await RecoverCode.findOne({ code : code});

    if (RecoverData) {
        const { email } = RecoverData;
        const user = await User.findOneAndUpdate({ email : email}, { password : password });
        user.password = await user.encryptPassword(password);
        await user.save();

        await RecoverCode.findOneAndDelete({ code : code });
        
        req.flash("success_msg", "Ahora puedes iniciar sesión con tu nueva contraseña.");
        res.redirect("/");
    }
    else {
        res.redirect("/recover");
    }
});

module.exports = router;