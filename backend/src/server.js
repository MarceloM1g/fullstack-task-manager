const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient();

const app = express();
const port = 3000

// Configs
app.use(cors());
app.use(express.json());

// Qualquer ação que o usuario fizer dentro do sistema, ele vai verificar se o token existe
// Ou seja, só vai ser possivel fazer algo no sistema se o usuário estiver logado
function authMiddleware(req, res, next) {
    // Após o user ser logado, qualquer ação, ele acionar essa função que vai receber token para verificar e se for valido e se for ele vai armazernar em uma variavel para ser usada, para criação de tasks, ou consultar as suas tasks com base no userID
    const authHeader = req.headers.authorization;

    // Se o token não tiver chegado aqui
    if (!authHeader) {
        return res.status(401).json({
            message: "Token não enviado!"
        });
    }

    // Separar "Bearer" do token
    const token = authHeader.split(" ")[1];

    try {
        // Verificar o Token
        const decoded = jwt.verify(
            token,
            "segredo-super-secreto"
        );

        // Salvar infos do usuário na request
        req.userId = decoded.id;

        // Continuar rota
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido"
        });
    }
}

// Rota GET - Buscar Dados
app.get("/tasks", authMiddleware, async (req, res) => {
    // Filtra para pegar apenas as tarefas DESTE usuário logado
    const userTasks = await prisma.task.findMany({
        where: {
            // Achar as tasks especifica do usuário logado naquele momento - req.userId = Usuário logado no momento
            userId: req.userId
        }
    });

    res.json(userTasks);
});

// Rota POST - Criar Task
app.post("/tasks", authMiddleware, async (req, res) => {
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
});

// DELETE
app.delete("/tasks/:id", authMiddleware, async (req, res) => {
    // Pega o ID da URL
    const id = Number(req.params.id);

    await prisma.task.deleteMany({
        where: {
            id: id,
            userId: req.userId
        }
    });

    res.status(204).send();
});

// Editar
app.put('/tasks/:id', authMiddleware, async (req, res) => {
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
});

// Registrar
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Conferindo a existencia de um usuario no banco de dados
    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userAlreadyExists) {
        return res.status(400).json({
            message: "Usuário já existe"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando um novo usuário no banco de dados
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({
        message: "Usuário criado com sucesso"
    });
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Procurar Usuário no banco de dados
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    // Se não encontrar
    if (!user) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        });
    }

    // Comparar senha digitada com senha criptografada
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    // Se senha estiver errada
    if (!passwordMatch) {
        return res.status(401).json({
            message: 'Senha incorreta'
        });
    }

    // Se tudo acima estiver correto - Gerando o Token do Usuário
    const token = jwt.sign(
        { id: user.id },
        "segredo-super-secreto",
        { expiresIn: '1d' }
    );

    res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Rota para busacar nome de usuário
app.get('/user', authMiddleware, async (req, res) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        }
    });

    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log(user.name)
    res.json({
        name: user.name
    })
});

app.listen(port, () => {
    console.log(`Servidor está ativo http://localhost:${port}/`);
});