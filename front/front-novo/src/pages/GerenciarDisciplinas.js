import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function GerenciarDisciplinas() {
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionadoId, setAlunoSelecionadoId] = useState('');
    const [disciplinasMatriculadas, setDisciplinasMatriculadas] = useState([]);
    const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await api.get('/alunos');
                setAlunos(response.data);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
                if (error.response && error.response.status === 401) navigate('/login');
            }
        };
        fetchAlunos();
    }, [navigate]);

    useEffect(() => {
        if (!alunoSelecionadoId) {
            setDisciplinasMatriculadas([]);
            setDisciplinasDisponiveis([]);
            return;
        }

        const fetchDadosDisciplinas = async () => {
            try {
                const resMatriculadas = await api.get(`/aluno-disciplina/aluno/${alunoSelecionadoId}`);
                const resTodas = await api.get('/disciplinas');
                
                const matriculadas = resMatriculadas.data;
                const todas = resTodas.data;

                const idsMatriculadas = matriculadas.map(d => d._id);
                const disponiveis = todas.filter(d => !idsMatriculadas.includes(d._id));
                
                setDisciplinasMatriculadas(matriculadas);
                setDisciplinasDisponiveis(disponiveis);
            } catch (error) {
                console.error("Erro ao buscar disciplinas:", error);
                if (error.response && error.response.status === 401) navigate('/login');
            }
        };

        fetchDadosDisciplinas();
    }, [alunoSelecionadoId, navigate]);

    const handleAlocar = async (idDisciplina) => {
        try {
            await api.post(`/aluno-disciplina/vincular/${alunoSelecionadoId}/${idDisciplina}`);
            const disciplinaMovida = disciplinasDisponiveis.find(d => d._id === idDisciplina);
            setDisciplinasMatriculadas([...disciplinasMatriculadas, disciplinaMovida]);
            setDisciplinasDisponiveis(disciplinasDisponiveis.filter(d => d._id !== idDisciplina));
        } catch (error) {
            console.error("Erro ao alocar disciplina:", error);
            if (error.response && error.response.status === 401) navigate('/login');
        }
    };

    const handleDesalocar = async (idDisciplina) => {
        try {
            await api.delete(`/aluno-disciplina/remover/${alunoSelecionadoId}/${idDisciplina}`);
            const disciplinaMovida = disciplinasMatriculadas.find(d => d._id === idDisciplina);
            setDisciplinasDisponiveis([...disciplinasDisponiveis, disciplinaMovida]);
            setDisciplinasMatriculadas(disciplinasMatriculadas.filter(d => d._id !== idDisciplina));
        } catch (error) {
            console.error("Erro ao desalocar disciplina:", error);
            if (error.response && error.response.status === 401) navigate('/login');
        }
    };

    return (
        <div className="container">
            <h1>Gerenciar Disciplinas por Aluno</h1>
            <div className="form-group">
                <label>Selecione um Aluno:</label>
                <select onChange={(e) => setAlunoSelecionadoId(e.target.value)} value={alunoSelecionadoId}>
                    <option value="">-- Escolha um aluno --</option>
                    {alunos.map(aluno => (
                        <option key={aluno._id} value={aluno._id}>
                            {aluno.nome} (Matrícula: {aluno.matricula})
                        </option>
                    ))}
                </select>
            </div>
            {alunoSelecionadoId && (
                <div className="disciplinas-container">
                    <div className="disciplina-lista">
                        <h2>Disciplinas Matriculadas</h2>
                        <ul>{disciplinasMatriculadas.map(d => (<li key={d._id}>{d.nome}<button onClick={() => handleDesalocar(d._id)}>Desalocar</button></li>))}</ul>
                    </div>
                    <div className="disciplina-lista">
                        <h2>Disciplinas Disponíveis</h2>
                        <ul>{disciplinasDisponiveis.map(d => (<li key={d._id}>{d.nome}<button onClick={() => handleAlocar(d._id)}>Alocar</button></li>))}</ul>
                    </div>
                </div>
            )}
        </div>
    );
}