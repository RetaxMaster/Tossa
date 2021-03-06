//Este archivo atiende todas las peticiones Ajax

const express = require('express');
const router = express.Router();
const Categories = require("../models/Categories");
const User = require("../models/Users");
const Problems = require("../models/Problems");
const Responses = require("../models/Responses");
const { isLoggedIn } = require('../lib/auth');
const f = require("../lib/helpers");

router.post("/requests", isLoggedIn, async (req, res) => {
    const { mode } = req.body;
    const response = {};

    const deleteProblem = async problemId => {
        const allResponses = await Responses.find({problem : problemId});
        allResponses.forEach(async responses => {
            await Responses.findByIdAndDelete(responses._id);
        });

        await Problems.findByIdAndDelete(problemId);
    };

    const deleteCategory = async categoryId => {
        const allProblems = await Problems.find({category : categoryId});
        allProblems.forEach(problem => {
            deleteProblem(problem._id);
        });
        await Categories.findByIdAndDelete(categoryId);
    };

    let responseId = "", action = "", userResponse;

    switch (mode) {

        //Añade una nueva categoría
        case "addCategory":
            let { name } = req.body;
            let url_name = f.parseUrlName(name);
            
            let category = await Categories.findOne({ name : name });
        
            if (category) {
                response.status = false;
                response.error = "Esta categoría ya está creada.";
            }
            else {
                const newCategory = new Categories({ name, url_name });
                await newCategory.save();
                response.status = true;
                response.name = name;
                response.id = newCategory._id;
            }
            break;
        
        //Elimina una categoría
        case "deleteCategory":
            let { id } = req.body;
            deleteCategory(id);
            response.status = true;
            break;

        //Agrega un administrador a la página
        case "addAdmin":
            let { username } = req.body;
            let user = await User.findOne({ username : username });
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
        
        //Elimina un administrador de la página
        case "deleteAdmin":
            let adminId = req.body.id;
            await User.findByIdAndUpdate(adminId, {
                role: "0"
            });
            response.status = true;
            break;
        
        //Publica un nuevo problema
        case "newProblem":
            let { title, description } = req.body;
            let problemCategory = req.body.category;
            let usrname = req.user.username;

            const newProblem = new Problems({ 
                title : title, 
                description : description, 
                category : problemCategory, 
                user : usrname
            });
            await newProblem.save();

            response.status = true;
            response.problems = {
                id : newProblem._id,
                title : title,
                description : description,
                category : problemCategory, 
                user: req.user.username
            }

            break;

        case "makeResponse":
            const { responseText, pubId } = req.body;
            const usr = req.user.username;

            const newResponse = new Responses({ 
                response: responseText,
                user : usr,
                problem : pubId 
            });
            await newResponse.save();

            response.status = true;
            break;

        case "getResponses":
            const idPub = req.body.id;
            const responses = await Responses.find({ problem : idPub});

            response.status = true;
            response.responses = responses;
            response.userId = req.user._id;
            break;

        case "like":
            responseId = req.body.responseId;
            action = req.body.action;
            userResponse = await Responses.findById(responseId);
            
            if(action == "put")
                userResponse.likes.push(req.user._id);
            else
                userResponse.likes.splice(userResponse.likes.indexOf(req.user._id), 1);
            
            userResponse.save();
            response.status = true;
            response.total = userResponse.likes.length;
            break;

        case "dislike":
            responseId = req.body.responseId;
            action = req.body.action;
            userResponse = await Responses.findById(responseId);
            
            if(action == "put")
                userResponse.dislikes.push(req.user._id);
            else
                userResponse.dislikes.splice(userResponse.dislikes.indexOf(req.user._id), 1);

            userResponse.save();
            response.status = true;
            response.total = userResponse.dislikes.length;
            break;
    
        default:
            response.status = false;
            response.error = "Error en la petición";
            break;
        }

        res.send(response);
    });


module.exports = router;