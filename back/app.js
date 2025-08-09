const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const conn = require("./database/conn");
conn();

// Importação das rotas
const alunoRoutes = require("./routes/alunos");
const disciplinaRoutes = require("./routes/disciplinas");
const alunoDisciplinaRoutes = require("./routes/alunoDisciplina");
const authRoutes = require("./routes/auth"); 


// Definição das rotas
app.use("/api/alunos", alunoRoutes);
app.use("/api/disciplinas", disciplinaRoutes);
app.use("/api/aluno-disciplina", alunoDisciplinaRoutes);
app.use("/api/auth", authRoutes); 


// Porta
const port = 3001;  
app.listen(port, () => {
  console.log(`Servidor ativo na porta ${port}`);
});