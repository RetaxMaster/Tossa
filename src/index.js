const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/problems',
  collection: 'mySessions'
});

//Initializations
const app = express();
require("./database");
require('./lib/passport');
require("./lib/setDefaultAdmin");

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
app.use(session({
  /* key: 'kfneiofh20ewf2', */
  secret : "nwdpojpqwsd0",
  resave: false,
  saveUninitialized: true,
  store : store
}));

app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use(require('./routes'));
app.use("/problems", require('./routes/problems'));
app.use(require('./routes/config'));
app.use(require('./routes/ajaxRequests'));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting server
app.listen(app.get("port"), () => {
    console.log("El servidor está corriendo en el puerto ", app.get("port"));
});