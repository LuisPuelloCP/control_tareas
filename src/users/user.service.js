const userSchema = require("../models/users.model");
const taskSchema = require("../models/task.model");


//obtener todos los usuarios
const getAll = async (res) => {
  return await userSchema
    .find()
    .populate("tasks")
    .then((data) => res.render("usersList", {users:data}))
    .catch((error) =>
      res.json({ message: "Error creando usuario", body: error })
    );
};
//obtener un usuario por ID
const getById = async (id, res) => {
  return await userSchema
    .findById(id)
    .populate("tasks")
    .then((data) => res.json({ message: "Usuario encontrado", body: data }))
    .catch((error) => res.json({ message: "Usuario no existe", body: error }));
};
//Actualizar un usuario
const update = async (updateUser, id, res) => {
  return await userSchema
    .updateOne({ _id: id }, { $set: { ...updateUser } })
    .then((data) =>
      res.json({ message: "Usuario actualizado", body: updateUser })
    )
    .catch((error) => res.json({ message: "Usuario no existe", body: error }));
};
//Eliminar un usuario
const eliminate = async (id, res) => {
  return await userSchema
    .remove({ _id: id })
    .then((data) => res.json({ message: "Usuario eliminado", body: data }))
    .catch((error) => res.json({ message: "Algo salio mal", body: error }));
};

const assigment = async (idUser, idTask, res) => {
  //Tarea para el usuario
  const newTask = await taskSchema.findById(idTask);
  //buscar usuario para asignar tarea
  const user = await userSchema.findById(idUser);
  //asignar a la tarea el usuario
  newTask.user = user;
  //guardar tarea para el usuario
  await newTask.save();
  //asignar tarea dentro del array de tareas del usuario;
  user.tasks.push(newTask);
  //guardar usuario con su tarea
  await user.save();

  res.send(user);
  res.render("homeAdmin");
};

module.exports.UsersService = {
  getAll,
  getById,
  update,
  eliminate,
  assigment,
};
