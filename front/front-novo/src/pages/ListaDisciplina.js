import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify';

export default function ListaDisciplina() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await api.get('/disciplinas');
                setDisciplinas(response.data);
            } catch (error) {
                console.error("Falha ao carregar disciplinas:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDisciplinas();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta disciplina?")) {
            try {
                await api.delete(`/disciplinas/${id}`);
                setDisciplinas(disciplinas.filter(d => d._id !== id));
                toast.success("Disciplina excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir disciplina:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                     toast.error("Erro ao excluir disciplina.");
                }
            }
        }
    };

    if (loading) {
        return <div className="container"><h1>Carregando...</h1></div>;
    }

    return (
        <div className="container">
            <h1>Lista de Disciplinas</h1>
            <Link to="/disciplinas/novo" className="btn-novo">
                <img src="/images/add-disciplina.png" alt="Novo" style={{ width: '30px', verticalAlign: 'middle' }} />
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinas.map((disciplina) => (
                        <tr key={disciplina._id}>
                            <td>{disciplina.nome}</td>
                            <td>{disciplina.cargaHoraria}h</td>
                            <td className="acoes">
                                <Link to={`/disciplinas/editar/${disciplina._id}`} className="btn-editar">Editar</Link>
                                <button onClick={() => handleDelete(disciplina._id)} className="btn-excluir">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}