// controllers/userController.js
const User = require("../models/User"); 

const userController = {
    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password // Na aplicação real, isso seria criptografado
            };
            
            // Validação simples para garantir que todos os campos foram enviados
            if (!user.name || !user.email || !user.password) {
                return res.status(422).json({ msg: "Nome, email e senha são obrigatórios." });
            }

            const response = await User.create(user);
            res.status(201).json({ response, msg: "Usuário cadastrado com sucesso!" });

        } catch (error) {
            console.log(error);
            // envia uma resposta de erro para o front-end
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    },

    readAll: async (req, res) => {
        try {
            const results = await User.find({});
            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    },

    readOne: async (req, res) => {
        try {
            const id = req.params.id;
            const results = await User.findById(id); // findById é um atalho para findOne({_id: id})
            
            if (!results) {
                return res.status(404).json({ msg: "Usuário não encontrado." });
            }
            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    },
    
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const user = {
                name: req.body.name,
                email: req.body.email,
            };
            
            // Usando findByIdAndUpdate que é mais comum e pode retornar o documento atualizado
            const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
            
            if (!updatedUser) {
                return res.status(404).json({ msg: "Usuário não encontrado." });
            }
            res.status(200).json({ updatedUser, msg: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({ msg: "Usuário não encontrado." });
            }
            res.status(200).json({ deletedUser, msg: "Usuário deletado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Ocorreu um erro no servidor." });
        }
    },
};

module.exports = userController;