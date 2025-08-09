const mongoose = require("mongoose");
const { Schema } = mongoose;

const alunoSchema = new Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Isso cria a referência ao model de User
        required: true
    },
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  cpf: { type: String, required: true, unique: true },
  matricula: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  curso: { type: String, required: true },
  disciplinas: [{ type: Schema.Types.ObjectId, ref: "Disciplina" }] // Relacionamento M:N
}, { timestamps: true });

module.exports = mongoose.model("Aluno", alunoSchema);