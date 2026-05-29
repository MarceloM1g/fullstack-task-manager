const jwt = require('jsonwebtoken');

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
            process.env.JWT_SECRET
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

module.exports = authMiddleware;