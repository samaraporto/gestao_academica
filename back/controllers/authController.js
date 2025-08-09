const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(422).json({ error: "Nome, email e senha são obrigatórios." });
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(422).json({ error: "Por favor, utilize outro e-mail." });
            }

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: passwordHash
            });

            await user.save();
            res.status(201).json({ message: "Usuário criado com sucesso!" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Houve um erro no servidor, tente novamente mais tarde." });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "Usuário ou senha inválidos." });
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.status(422).json({ error: "Usuário ou senha inválidos." });
            }

            const secret = "SEGREDO_SUPER_SECRETO_PARA_PROTEGER_O_TOKEN";
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '8h' });

           
            res.status(200).json({
                message: "Autenticação realizada com sucesso!",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Houve um erro no servidor, tente novamente mais tarde." });
        }
    }
};