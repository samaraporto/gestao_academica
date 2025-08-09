const express = require("express");
const router = express.Router();

// Importe os routers específicos
const alunoRouter = require("./alunos");
const disciplinaRouter = require("./disciplinas");
const alunoDisciplinaRouter = require("./alunoDisciplina");

// Defina os prefixes das rotas
router.use("/alunos", alunoRouter);
router.use("/disciplinas", disciplinaRouter);
router.use("/aluno-disciplina", alunoDisciplinaRouter);

module.exports = router;