//Este archivo enlaza a las páginas de tipo 2

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const Categories = require("../models/Categories");

router.get("/", isLoggedIn, async (req, res) => {
    const categories = await Categories.find();
    
    const data = {
        body : req.body,
        user : req.user,
        categories : categories,
        page : "problems"
    };

    res.render("page2/problems", { data });
});

module.exports = router;