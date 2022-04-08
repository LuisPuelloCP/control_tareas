const express = require("express");
const router = express.Router();

module.exports.Views = (app) => {
  router
    //Ruta registrar
    .get("/signup", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        res.render("signup");
      }else{
        res.render("home");
      }
    })
    
    //Ruta para asignar tarea
    .get("/assigmentTask", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        res.render("assigmentTask")
      }else{
        res.render("home");
      }
    })
  // Ruta para el inicio del administrador
    .get("/home", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        res.render("homeAdmin")
      }else{
        res.render("homeOper");
      }
    })

    //Ruta para realizar el login
    .get("/post/auth/login", (req, res, next) => {
      if(req.user){
        if (req.user.rol === "administrador") {
          res.render("homeAdmin");
        }else{
          res.render("homeOper");
        }
      }else{ 
        res.render("signin");
      }
      
    })
    // ruta para editar perfil
    .get("/edit/profile", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        res.render("editProfileAdmin")
      }else{
        res.render("editProfileOper");
      }
      
    })
    //Ruta para crear tarea
    .get("/task/create", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        res.render("createTask")
      }else{
        res.render("homeOper");
      }
    })
    //Ruta para editar tarea
    .get("/task/edit/:id", isAuthenticated, (req, res, next) => {
      const user = req.user;
      if( user.rol === "administrador"){
        const {idTask} = req.params
        res.render("editTask", {task: idTask})
      }else{
        res.render("homeOper");
      }
    })

    .get("/", (req, res, next) => {
      res.redirect("/home")
    })
  
    function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/post/auth/login");
    }


  app.use("/", router);
};
