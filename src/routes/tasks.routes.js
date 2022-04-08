const express = require('express');

const router = express.Router();
const {TasksController} = require('../tasks/task.controller');


module.exports.TasksAPI = (app) => {
    router
    //Ruta obtener todos las tareas
    .get("/get/tasks",isAuthenticated, TasksController.getTasks)
    //Ruta obtener una tarea por ID
    .get("/get/task/",isAuthenticated, TasksController.getTask)
    //Ruta Obtener tareas por id Usuario
    .get("/get/task/user/:id",isAuthenticatedAdmin, TasksController.getTaskUser)
    //Ruta crear una tarea
    .post("/post/task",isAuthenticatedAdmin, (req, res, next) => {
        TasksController.createTask(req,res)
        res.redirect("/")

    })
    //Ruta actualizar una tarea
    .post("/patch/task/",isAuthenticated, TasksController.updateTask)
    //Eliminar una tarea
    .delete("/delete/task/:id",isAuthenticatedAdmin, TasksController.deleteTask)


    
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
    app.use("/", router)

};