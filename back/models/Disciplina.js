const mongoose = require("mongoose");
const { Schema } = mongoose;

const disciplinaSchema = new Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  nome: { type: String, required: true },
  cargaHoraria: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Disciplina", disciplinaSchema);