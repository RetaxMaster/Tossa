//Este archivo enlaza a las páginas de tipo 2

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

router.get("/", isLoggedIn, (req, res) => {
    const data = {
        body : req.body,
        user : req.user,
        page : "problems"
    };
    
    console.log(data.user);
    

    res.render("page2/problems", { data });
});

module.exports = router;