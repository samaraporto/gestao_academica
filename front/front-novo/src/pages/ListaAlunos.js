import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; // 1. Importe o useNavigate
import api from '../services/api'; // 1. Importe nosso serviço de API
import { toast } from 'react-toastify';

export default function ListaAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegar entre as páginas

    // 2. useEffect reescrito com async/await e o serviço 'api'
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                // Usa api.get() que já envia o token de autorização
                const response = await api.get('/alunos');
                setAlunos(response.data);
            } catch (error) {
                console.error("Falha ao carregar alunos:", error);
                // Se o erro for 401 (Não Autorizado), o token é inválido ou expirou
                if (error.response && error.response.status === 401) {
                    toast.error("Sua sessão expirou. Por favor, faça o login novamente.");
                    navigate('/login'); // Redireciona para a página de login
                } else {
                    toast.error("Não foi possível carregar a lista de alunos.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAlunos();
    }, [navigate]); // Adicionamos navigate às dependências do useEffect

    // 3. handleDelete reescrito com o serviço 'api'
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
            try {
                // Usa api.delete() que também já envia o token
                await api.delete(`/alunos/${id}`);

                setAlunos(alunos.filter(aluno => aluno._id !== id));
                toast.success("Aluno excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir aluno:", error);
                if (error.response && error.response.status === 401) {
                    toast.error("Sua sessão expirou. Por favor, faça o login novamente.");
                    navigate('/login');
                } else {
                    toast.error("Erro ao excluir aluno.");
                }
            }
        }
    };

    if (loading) {
        return <div className="container"><h1>Carregando...</h1></div>;
    }

    return (
        <div className="container">
            <h1>Lista de Alunos</h1>
            <Link to="/alunos/novo" className="btn-novo">
               <img src="/images/add-aluno.png" alt="Novo" style={{ width: '25px', verticalAlign: 'middle' }} />
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno._id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.matricula}</td>
                            <td className="acoes">
                                <Link to={`/alunos/editar/${aluno._id}`} className="btn-editar">
                                    Editar
                                </Link>
                                <button onClick={() => handleDelete(aluno._id)} className="btn-excluir">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}