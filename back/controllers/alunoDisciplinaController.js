const Aluno = require("../models/Aluno");
const Disciplina = require("../models/Disciplina");

module.exports = {
  // Vincular disciplina a aluno
  addDisciplina: async (req, res) => {
    try {
      const aluno = await Aluno.findById(req.params.idAluno);
      const disciplina = await Disciplina.findById(req.params.idDisciplina);

      if (!aluno || !disciplina) {
        return res.status(404).json({ error: "Aluno ou disciplina não encontrados" });
      }

      // Evita duplicação
      if (!aluno.disciplinas.includes(disciplina._id)) {
        aluno.disciplinas.push(disciplina._id);
        await aluno.save();
      }

      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json({ error: "Falha ao vincular disciplina" });
    }
  },

  // Remover disciplina de aluno
  removeDisciplina: async (req, res) => {
    try {
      const aluno = await Aluno.findById(req.params.idAluno);
      if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

      aluno.disciplinas.pull(req.params.idDisciplina);
      await aluno.save();

      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json({ error: "Falha ao remover disciplina" });
    }
  },

  // Listar disciplinas de um aluno
  getDisciplinas: async (req, res) => {
    try {
      const aluno = await Aluno.findById(req.params.idAluno).populate("disciplinas");
      if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
      res.status(200).json(aluno.disciplinas);
    } catch (error) {
      res.status(500).json({ error: "Falha ao buscar disciplinas" });
    }
  }
};