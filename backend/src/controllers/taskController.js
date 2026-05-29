const prisma = require('../lib/prisma');

// Buscar Dados
async function getTasks(req, res) {
    try {
        // Filtra para pegar apenas as tarefas DESTE usuário logado
        const userTasks = await prisma.task.findMany({
            where: {
                // Achar as tasks especifica do usuário logado naquele momento - req.userId = Usuário logado no momento
                userId: req.userId
            }
        });

        res.json(userTasks);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Erro ao buscar Tasks'
        });
    }
}

// Criar Task
async function createTask(req, res) {
    try {
        // Pegando dados do frontend
        const { title, description } = req.body;

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.userId
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Erro ao criar Tasks'
        });
    }
}

// DELETE Task
async function deleteTask(req, res) {
    try {
        const id = Number(req.params.id);

        await prisma.task.deleteMany({
            where: {
                id: id,
                userId: req.userId
            }
        });

        res.status(204).send();
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Erro ao deletar Tasks'
        });
    }
}

// Editar Task
async function editTask(req, res) {
    try {
        const id = Number(req.params.id);
        const { title, description } = req.body;

        await prisma.task.updateMany({
            where: {
                id: id,
                userId: req.userId,
            },
            data: {
                title: title,
                description: description
            }
        });

        res.json({ message: "Task editada com sucesso" })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Erro ao editar Tasks'
        });
    }
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    editTask
}