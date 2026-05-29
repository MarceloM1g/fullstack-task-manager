const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

// Registrar
async function register(req, res) {
    try {
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
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "Usuário registrado com sucesso"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Erro ao registrar Usuário'
        })
    }
}

// Login
async function login(req, res) {
    try {
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
                message: "Email ou senha inválidos"
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
                message: 'Email ou senha inválidos'
            });
        }

        // Se tudo acima estiver correto - Gerando o Token do Usuário
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
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
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Erro ao realizar login'
        })
    }
}

module.exports = {
    register,
    login
};