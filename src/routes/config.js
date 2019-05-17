//Este archivo enlaza a las páginas de tipo 3

const express = require('express');
const router = express.Router();

router.get("/config", (req, res) => {
    const data = req.body;
    data.page = "config";
    res.render("page3/config", { data });
});

module.exports = router;