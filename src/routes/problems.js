//Este archivo enlaza a las páginas de tipo 2

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const Categories = require("../models/Categories");
const User = require("../models/Users");
const Problems = require("../models/Problems");
const Responses = require("../models/Responses");

router.get("/:category", isLoggedIn, async (req, res) => {
    const { category } = req.params;
    const categories = await Categories.find();
    let problems;
    let actualCategory;
    let actualCategoryId;

    if (category == "all") {
        //Si category es all, obtenemos todas las categorías
        problems = await Problems.find();
        actualCategory = "Todas";
        actualCategoryId = "0";
    }
    else {
        //Si se pide una categoría en específico, buscamos el id de esa categoría
        let getActualCategory = await Categories.findOne({ url_name : category });
        
        if (getActualCategory) {
            //Si la categoría se encuentra, obtenemos su id y buscamos los problemas con ese id
            actualCategoryId = getActualCategory._id.toString();
            actualCategory = getActualCategory.name;
            problems = await Problems.find({ category : actualCategoryId });
        }
        else {
            return res.redirect("/problems/all");
        }
    }
    
    problems.reverse();
    
    const data = {
        body: req.body,
        user: req.user,
        categories: categories,
        problems : problems,
        actualCategory : actualCategory,
        actualCategoryId : actualCategoryId,
        page: "problems"
    };

    res.render("page2/problems", { data });
});

module.exports = router;