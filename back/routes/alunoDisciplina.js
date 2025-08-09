const express = require("express");
const router = express.Router();
const alunoDisciplinaController = require("../controllers/alunoDisciplinaController");

// Rota para VINCULAR uma disciplina a um aluno
// Ex: POST http://localhost:3001/api/aluno-disciplina/vincular/ID_DO_ALUNO/ID_DA_DISCIPLINA
router.post("/vincular/:idAluno/:idDisciplina", alunoDisciplinaController.addDisciplina);

// Rota para REMOVER o vínculo de uma disciplina de um aluno
// Ex: DELETE http://localhost:3001/api/aluno-disciplina/remover/ID_DO_ALUNO/ID_DA_DISCIPLINA
router.delete("/remover/:idAluno/:idDisciplina", alunoDisciplinaController.removeDisciplina);

// Rota para LISTAR todas as disciplinas de um aluno específico
// Ex: GET http://localhost:3001/api/aluno-disciplina/aluno/ID_DO_ALUNO
router.get("/aluno/:idAluno", alunoDisciplinaController.getDisciplinas);

module.exports = router;