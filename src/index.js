const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//require('./lib/passport');

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs", exphbs({
  defaultLayout : "",
  layoutsDir : path.join(app.get("views"), "layouts"),
  partialsDir : path.join(app.get("views"), "partials"),
  extname : ".hbs",
  helpers : require("./lib/handlebars")
}));
app.set("view engine", ".hbs");

//Middlewares
/* app.use(session({
  key: 'kfneiofh20ewf2',
  secret : "nwdpojpqwsd0",
  resave : false,
  saveUninitialized : false
})); */
app.use(flash());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
/* app.use(passport.initialize());
app.use(passport.session());*/

//Global variables
app.use((req, res, next) => {
  next();
});

//Routes
app.use(require('./routes'));
app.use("/problems", require('./routes/problems'));
app.use(require('./routes/config'));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting server
app.listen(app.get("port"), () => {
    console.log("El servidor está corriendo en el puerto ", app.get("port"));
});