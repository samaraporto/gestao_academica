// routes/alunos.js
const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const checkToken = require("../middlewares/checkToken"); 

router.post("/", checkToken, alunoController.create);
router.get("/", checkToken, alunoController.getAll);
router.get("/matricula/:matricula", checkToken, alunoController.getByMatricula);
router.get("/:id", checkToken, alunoController.getById);
router.put("/:id", checkToken, alunoController.update);
router.delete("/:id", checkToken, alunoController.delete);

module.exports = router;