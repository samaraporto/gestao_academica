// routes/users.js
const router = require("express").Router();
const userController = require("../controllers/userController");

// Rota para criar um usuário (POST /api/users)
router.post("/", userController.create);

// Rota para listar todos os usuários (GET /api/users/all)
router.get("/all", userController.readAll);

// Rota para buscar um usuário por ID (GET /api/users/:id)
router.get("/:id", userController.readOne);

// Rota para atualizar um usuário (PUT /api/users/:id)
router.put("/:id", userController.update);

// Rota para deletar um usuário (DELETE /api/users/:id)
router.delete("/:id", userController.delete);

module.exports = router;