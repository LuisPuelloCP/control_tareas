const userSchema = require("../models/users.model");
const taskSchema = require("../models/task.model");

//Crear un nuevo usuario
const create = async (body, res) => {
  const task = await taskSchema(body);
  return await task
    .save()
    .then((data) => res.json({ message: "Tarea creada", body: data }))
    .catch((error) =>
      res.json({ message: "Error creando tarea", body: error })
    );
};
//obtener todos los usuarios
const getAll = async (res) => {
  return await taskSchema
    .find()
    .populate("user")
    .then((data) => res.render("taskList", { tasks: data }))
    .catch((error) =>
      res.json({
        message: "Error buscando tareas o no hay tareas",
        body: error,
      })
    );
};
//obtener un usuario por ID
const getById = async (id, res) => {
  return await taskSchema
    .findById(id)
    .populate("user")
    .then((data) => res.render("editTask", { task: data }))
    .catch((error) => res.json({ message: "Tarea no existe", body: error }));
};
//Actualizar un usuario
const update = async (updateTask, id, res) => {
  return await taskSchema
    .updateOne(
      { id },
      {
        $set: {
          name: updateTask.name,
          status: updateTask.status,
          description: updateTask.description,
        },
      }
    )
    .then((data) =>
      res.render("homeAdmin")
    )
    .catch((error) => res.json({ message: "Algo salio mal", body: error }));
};

const eliminate = async (id, res) => {
  return await taskSchema
    .remove({ _id: id })
    .then((data) => res.json({ message: "Tarea eliminada", body: data }))
    .catch((error) => res.json({ message: "Algo salio mal", body: error }));
};

const getByIdUser = async (id, res) => {
  const user = await userSchema.findById(id);
  return await taskSchema
    .find({ user: id })
    .populate("user")
    .then((data) =>
      res.json({ message: `Tareas del usuario ${user.name}`, body: data })
    )
    .catch((error) => res.json({ message: "Algo salio mal", body: error }));
};

module.exports.TasksService = {
  create,
  getAll,
  getById,
  update,
  eliminate,
  getByIdUser,
};
