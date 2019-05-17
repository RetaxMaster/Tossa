//Este archivo enlaza a las páginas de tipo 2

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const data = req.body;
    data.page = "problems";
    res.render("page2/problems", { data });
});

module.exports = router;