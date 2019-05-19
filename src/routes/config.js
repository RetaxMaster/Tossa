//Este archivo enlaza a las páginas de tipo 3

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

router.get("/config", isLoggedIn, (req, res) => {
    const data = req.body;
    const user = req.user;
    if (user.role == "1") {
        data.page = "config";
        res.render("page3/config", { data });
    }
    else {
        res.redirect("/problems");
    }
});

module.exports = router;