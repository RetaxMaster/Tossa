//Este archivo atiende todas las peticiones Ajax

const express = require('express');
const router = express.Router();
const Categories = require("../models/Categories");
const User = require("../models/Users");
const { isLoggedIn } = require('../lib/auth');

router.post("/requests", isLoggedIn, async (req, res) => {
    const { mode } = req.body;
    const user = req.user;
    const response = {};

    switch (mode) {
        case "addCategory":
            const { name } = req.body;
            const category = await Categories.findOne({ name : name });
            
            if (category) {
                response.status = false;
                response.error = "Esta categoría ya está creada.";
            }
            else {
                const newCategory = new Categories({ name });
                await newCategory.save();
                response.status = true;
                response.name = name;
                response.id = newCategory._id;
            }
            break;

        case "deleteCategory":
            let { id } = req.body;
            await Categories.findByIdAndDelete(id);
            response.status = true;
            break;

        case "addAdmin":
            const { username } = req.body;
            const user = await User.findOne({ username : username });
            if (user) {
                user.role = "1";
                await user.save();
                response.status = true;
                response.id = user._id;
                response.username = username;
            }
            else{
                response.status = false;
                response.error = "Este usuario no existe.";
            }
            break;

        case "deleteAdmin":
            let adminId = req.body.id;
            await User.findByIdAndUpdate(adminId, {
                role: "0"
            });
            response.status = true;
            break;
    
        default:
            response.status = false;
            response.error = "Error en la petición";
            break;
        }

        res.send(response);
    });


module.exports = router;