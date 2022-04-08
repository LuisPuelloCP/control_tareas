const {TasksService} = require('./task.service');

module.exports.TasksController = {
    //Crear una nueva tarea
    createTask: async (req,res) => {
        try {
            const { body } = req;
            if (!body) {
                console.error(error);
            }else{
                await TasksService.create(body, res);
                console.log(`Tarea creada`);
            }
        } catch (error) {
            console.error(error);
        }
    },

    //obtener todas las tareas
    getTasks: async (req,res) => {
        try {
            await TasksService.getAll(res);
        } catch (error) {
            console.error(error);
        }
    },
    //Obtener una tarea por ID
    getTask: async (req, res) => {
        try {
            const {params: {id}, } = req;
            let user = await TasksService.getById(id, res);
            if (!user) {
                console.log("Tarea no existe");
            }else{
                console.log("Tarea encontrada");
            }
        } catch (error) {
            console.error(error);
        }
    },
    //Actualizar una tarea
    updateTask: async (req, res) => {
        try {   
            const {body: updateTask} = req;
            const {body : id } = req;
            if (!updateTask) {
                console.error(error);
            } else {
                const insertedId = await TasksService.update(updateTask, id, res);
                console.log("Tarea actualizada");
            }
        } catch (error) {
            console.error(error);
        }
    },
    // Eliminar una tarea
    deleteTask: async (req, res) => {
        const {params: {id},} = req;
        let taskDelete = await TasksService.eliminate(id, res);
        if (!taskDelete) {
            console.error(error);
        } else {
            console.log("Tarea eliminada");
        }
    },
    //Obtener tareas por ID Usuario
    getTaskUser: async (req, res) => {
        try {
            const {params: {id}, } = req;
            let user = await TasksService.getByIdUser(id, res);
            if (!user) {
                console.log("Tarea no existe");
            }else{
                console.log("Tareas encontradas");
            }
        } catch (error) {
            console.error(error);
        }
    },

}