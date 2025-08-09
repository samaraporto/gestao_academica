const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // Pega o token do header "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: "Acesso negado!" });
    }

    try {
        const secret = "SEGREDO_SUPER_SECRETO_PARA_PROTEGER_O_TOKEN";

        const decoded = jwt.verify(token, secret);

        // Adiciona o ID do usuário na requisição para ser usado no controller
        req.userId = decoded.id; 

        next();

    } catch (error) {
        res.status(400).json({ error: "Token inválido!" });
    }
}

module.exports = checkToken;