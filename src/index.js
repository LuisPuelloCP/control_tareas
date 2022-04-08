const express = require("express");
const mongoose = require("mongoose");
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./passport/local-auth');
// Para accender a los datos del archivo .env
require("dotenv").config();

//importando rutas para manejar controladores y servicios
const {UserAPI} = require('./routes/users.routes');
const {TasksAPI} = require('./routes/tasks.routes');
const {Views} = require('./routes/views.routes');
//creando 
const app = express();
//configurando puerto
const port = process.env.PORT || 3000;
//Necesario para crear vistas de tipo ejs
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}))
//para manejar datos de tipo json
app.use(express.json());
//Necesario para las variables de sesion
app.use(session({
  secret: "misesionsecreta",
  resav: false,
  saveUninitialized: false
}))
//Inicializamos las variables de sesion
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//para manejar los datos del usuario autenticado
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});


//modulos
UserAPI(app);
TasksAPI(app);
Views(app);
// creamos conexion a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening on port", port));
