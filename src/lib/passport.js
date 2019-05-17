const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const f = require("../lib/helpers");
const User = require("../models/Users");

//Registro
passport.use("local.signup", new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req, username, password, done) => {
    let error;

    if (password != confirm_password) {
        error = "Las contraseñas no coinciden";
    }
    else {
        const newUser = new User({ username, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser);
    }

    return done(null, false, { message : error});
}));

//Login
passport.use("local.signin", new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req, username, password, done) => {
    const user = await User.findOne({username : username});
    let error;

    if (!user) {
        error = "Usuario no encontrado";
    }
    else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }
        else {
            error = "Contraseña incorrecta";
        }
    }

    return done(null, false, { message : error});
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});