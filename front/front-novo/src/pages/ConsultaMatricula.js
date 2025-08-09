import React, { useState } from 'react';
import api from '../services/api'; // Usamos nosso serviço de API
import { useNavigate } from 'react-router-dom';

export default function ConsultaMatricula() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState('');
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setAluno(null);

        try {
            const response = await api.get(`/alunos/matricula/${matricula}`);
            setAluno(response.data);
        } catch (err) {
            console.error("Erro ao buscar aluno:", err);
            if (err.response && err.response.status === 401) {
                navigate('/login'); // Se a sessão expirar, vai para o login
            } else if (err.response && err.response.status === 404) {
                setError("Nenhum aluno encontrado com esta matrícula.");
            } else {
                setError("Ocorreu um erro ao buscar os dados.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Consulta de Disciplinas por Matrícula</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Digite a Matrícula do Aluno</label>
                    <input
                        type="text"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        placeholder="Digite a matrícula..."
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            <hr />

            <div className="results">
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                {aluno && (
                    <div>
                        <h2>Disciplinas Matriculadas para: {aluno.nome}</h2>
                        {aluno.disciplinas && aluno.disciplinas.length > 0 ? (
                            <ul>
                                {aluno.disciplinas.map(disciplina => (
                                    <li key={disciplina._id}>
                                        {disciplina.nome} (Carga Horária: {disciplina.cargaHoraria}h)
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Este aluno não está matriculado em nenhuma disciplina.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}