const Aluno = require("../models/Aluno");

module.exports = {
    create: async (req, res) => {
        try {
            const { nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso } = req.body;
            const userId = req.userId;
            const novoAluno = {
                nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso,
                userId: userId
            };
            const aluno = await Aluno.create(novoAluno);
            res.status(201).json(aluno);
        } catch (error) {
            res.status(400).json({ error: "Falha ao criar aluno", details: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const userId = req.userId;
            const alunos = await Aluno.find({ userId: userId }).populate("disciplinas");
            res.status(200).json(alunos);
        } catch (error) {
            res.status(500).json({ error: "Falha ao buscar alunos" });
        }
    },

    getByMatricula: async (req, res) => {
        try {
            const aluno = await Aluno.findOne({ 
                matricula: req.params.matricula, 
                userId: req.userId 
            }).populate("disciplinas");
            
            if (!aluno) {
                return res.status(404).json({ error: "Aluno com esta matrícula não encontrado" });
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ error: "Falha ao buscar aluno" });
        }
    },
    
    getById: async (req, res) => {
        try {
            const aluno = await Aluno.findById(req.params.id).populate("disciplinas");
            if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
            if (aluno.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ error: "Falha ao buscar aluno" });
        }
    },
    
    update: async (req, res) => {
        try {
            const alunoParaAtualizar = await Aluno.findById(req.params.id);
            if (!alunoParaAtualizar) return res.status(404).json({ error: "Aluno não encontrado" });
            if (alunoParaAtualizar.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }
            const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(alunoAtualizado);
        } catch (error) {
            res.status(400).json({ error: "Falha ao atualizar aluno" });
        }
    },
    
    delete: async (req, res) => {
        try {
            const alunoParaDeletar = await Aluno.findById(req.params.id);
            if (!alunoParaDeletar) return res.status(404).json({ error: "Aluno não encontrado" });
            if (alunoParaDeletar.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }
            await Aluno.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Aluno deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Falha ao deletar aluno" });
        }
    }
};