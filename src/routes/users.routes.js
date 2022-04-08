const express = require("express");
const router = express.Router();
const { UsersController } = require("../users/user.controller");
const passport = require("passport");

module.exports.UserAPI = (app) => {
  //Registrar un nuevo usuario
  router
    .post(
      "/post/user",isAuthenticatedAdmin,
      passport.authenticate("local-signup", {
        successRedirect: "/logout",
        failureRedirect: "/",
        passReqToCallback: true,
      })
    )
    //Ruta iniciar sesion
    .post(
      "/post/auth/login",
      passport.authenticate("local-signin", {
        successRedirect: "/",
        failureRedirect: "/signIn",
        passReqToCallback: true,
      })
    )

    //Ruta para cerrar sesion
    .get("/logout", isAuthenticated, (req, res, next) => {
      req.logOut();
      res.redirect("/post/auth/login")
    })

    //Ruta obtener todos los usuarios
    .get("/get/users",isAuthenticatedAdmin,  UsersController.getUsers)
    //Ruta obtener un Usuario por ID
    .get("/get/user/:id",  isAuthenticatedAdmin, UsersController.getUser)
    //Ruta actualizar un Usuario
    .post("/patch/user/:id", isAuthenticated , (req, res, next) => {
      UsersController.updateUser(req, res);
      res.redirect("/")
    })
    //Asignar una tarea
    .post("/asignar/task/user", isAuthenticatedAdmin, (req, res, next) => {
      UsersController.assigmentTask(req,res)
      res.redirect("/")
    })
    //Eliminar un usuario
    .delete("/delete/user/:",isAuthenticatedAdmin, UsersController.deleteUser)

    

    function isAuthenticatedAdmin(req, res, next) {
      const user = req.user;
      if (req.isAuthenticated() && user.rol === "administrador") {
        return next();
      }
      res.redirect("/post/auth/login");
    }
    function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/post/auth/login");
    }

  app.use("/", router);
};
