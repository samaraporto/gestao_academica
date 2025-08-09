import { Routes, Route } from "react-router-dom";

import ListaAlunos from "./pages/ListaAlunos";
import CadastroAluno from "./pages/CadastroAluno";
import UpdateAluno from "./pages/UpdateAluno";
import ListaDisciplina from "./pages/ListaDisciplina";
import CadastroDisciplina from "./pages/CadastroDisciplina";
import UpdateDisciplina from "./pages/UpdateDisciplina";
import Menu from "./pages/Menu";
import GerenciarDisciplinas from "./pages/GerenciarDisciplinas"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage'; 
import ConsultaMatricula from './pages/ConsultaMatricula'; 



export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 


            <Route path="/" element={<ListaAlunos />} />
            <Route path="/alunos" element={<ListaAlunos />} />
            <Route path="/alunos/novo" element={<CadastroAluno />} />
            <Route path="/alunos/editar/:id" element={<UpdateAluno />} />

            <Route path="/disciplinas" element={<ListaDisciplina />} />
            <Route path="/disciplinas/novo" element={<CadastroDisciplina />} />
            <Route path="/disciplinas/editar/:id" element={<UpdateDisciplina />} />
            
            <Route path="/menu" element={<Menu />} />

            <Route path="/gerenciar-disciplinas" element={<GerenciarDisciplinas />} />

            <Route path="/consulta" element={<ConsultaMatricula />} /> 


        </Routes>
    );
}