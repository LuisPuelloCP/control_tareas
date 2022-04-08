const {UsersService} = require('./user.service');

module.exports.UsersController = {

    //obtener todos los usuarios
    getUsers: async (req,res) => {
        try {
            const users = await UsersService.getAll(res);
            return res.json(users);
        } catch (error) {
            console.error(error);
        }
    },
    // Obtener un usuario
    getUser: async (req, res) => {
        try {
            const {params: {id}, } = req;
            let user = await UsersService.getById(id, res);
            if (!user) {
                console.log("Usuario no existe");
            }else{
                console.log("Usuario encontrado");
            }
        } catch (error) {
            console.error(error);
        }
    },
    //acttualizar un usuario
    updateUser: async (req, res) => {
        try {   
            const {body: updateUser} = req;
            const {params : {id},} = req;
            if (!updateUser) {
                console.error(error);
            } else {
                const insertedId = await UsersService.update(updateUser, id, res);
                console.log("Usuario actualizado");
            }
        } catch (error) {
            console.error(error);
        }
    },
    //Eliminar un usuario
    deleteUser: async (req, res) => {
        const {params: {id},} = req;
        let userDelete = await UsersService.eliminate(id, res);
        if (userDelete === 0) {
            console.error(error);
        } else {
            console.log("Usuario eliminado");
        }
    },
    //asignar una tarea
    assigmentTask: async (req, res) =>{
        const { body: {idUser} }= req;
        const { body: {idTask} } = req;
        await UsersService.assigment( idUser, idTask, res);
    }

}