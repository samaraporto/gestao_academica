const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const checkToken = require("../middlewares/checkToken"); // 1. Importa o middleware

// 2. Aplica o middleware 'checkToken' em todas as rotas de disciplina
router.post("/", checkToken, disciplinaController.create);
router.get("/", checkToken, disciplinaController.getAll);
router.get("/:id", checkToken, disciplinaController.getById);
router.put("/:id", checkToken, disciplinaController.update);
router.delete("/:id", checkToken, disciplinaController.delete);

module.exports = router;