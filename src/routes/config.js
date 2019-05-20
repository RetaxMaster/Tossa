//Este archivo enlaza a las páginas de tipo 3

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const Categories = require("../models/Categories");
const User = require("../models/Users");

router.get("/config", isLoggedIn, async (req, res) => {
    const user = req.user;
    if (user.role == "1") {
        const categories = await Categories.find();
        const admins = await User.find({ role : "1" });
        
        const data = { categories, admins, user };
        data.page = "config";

        res.render("page3/config", { data });
    }
    else {
        res.redirect("/problems");
    }
});

module.exports = router;