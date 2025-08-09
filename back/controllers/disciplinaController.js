const Disciplina = require("../models/Disciplina");

module.exports = {
    // --- FUNÇÃO DE CRIAR (MODIFICADA) ---
    create: async (req, res) => {
        try {
            const { nome, cargaHoraria } = req.body;
            const userId = req.userId; // Pega o ID do usuário vindo do middleware

            const novaDisciplina = {
                nome,
                cargaHoraria,
                userId: userId
            };

            const disciplina = await Disciplina.create(novaDisciplina);
            res.status(201).json(disciplina);
        } catch (error) {
            res.status(400).json({ error: "Falha ao criar disciplina" });
        }
    },

    // --- FUNÇÃO DE LISTAR (MODIFICADA) ---
    getAll: async (req, res) => {
        try {
            const userId = req.userId;

            // Busca apenas as disciplinas criadas pelo usuário logado
            const disciplinas = await Disciplina.find({ userId: userId });
            res.status(200).json(disciplinas);
        } catch (error) {
            res.status(500).json({ error: "Falha ao buscar disciplinas" });
        }
    },

    // --- FUNÇÃO DE BUSCAR POR ID (MODIFICADA PARA SEGURANÇA) ---
    getById: async (req, res) => {
        try {
            const disciplina = await Disciplina.findById(req.params.id);
            if (!disciplina) return res.status(404).json({ error: "Disciplina não encontrada" });

            // Verificação de segurança: a disciplina pertence ao usuário logado?
            if (disciplina.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }

            res.status(200).json(disciplina);
        } catch (error) {
            res.status(500).json({ error: "Falha ao buscar disciplina" });
        }
    },

    // --- FUNÇÃO DE ATUALIZAR (MODIFICADA PARA SEGURANÇA) ---
    update: async (req, res) => {
        try {
            const disciplinaParaAtualizar = await Disciplina.findById(req.params.id);
            if (!disciplinaParaAtualizar) return res.status(404).json({ error: "Disciplina não encontrada" });

            if (disciplinaParaAtualizar.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }

            const disciplinaAtualizada = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(disciplinaAtualizada);
        } catch (error) {
            res.status(400).json({ error: "Falha ao atualizar disciplina" });
        }
    },

    // --- FUNÇÃO DE DELETAR (MODIFICADA PARA SEGURANÇA) ---
    delete: async (req, res) => {
        try {
            const disciplinaParaDeletar = await Disciplina.findById(req.params.id);
            if (!disciplinaParaDeletar) return res.status(404).json({ error: "Disciplina não encontrada" });
            
            if (disciplinaParaDeletar.userId.toString() !== req.userId) {
                return res.status(403).json({ error: "Acesso negado." });
            }
            
            await Disciplina.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Disciplina deletada com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Falha ao deletar disciplina" });
        }
    }
};