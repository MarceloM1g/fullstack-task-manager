const prisma = require('../lib/prisma');

// Busacar nome de usuário
async function getUsername(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({
            name: user.name
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Erro ao buscar usuário'
        });
    }
}

module.exports = getUsername;