import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function UpdateAluno() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState({
        nome: '', endereco: '', dataNascimento: '', cpf: '',
        matricula: '', telefone: '', email: '', curso: ''
    });

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const response = await api.get(`/alunos/${id}`);
                const data = response.data;
                if (data.dataNascimento) {
                    data.dataNascimento = data.dataNascimento.split('T')[0];
                }
                setAluno(data);
            } catch (error) {
                console.error("Erro ao buscar dados do aluno:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchAluno();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/alunos/${id}`, aluno);
            toast.success('Aluno atualizado com sucesso!');
            navigate('/alunos');
        } catch (error) {
            console.error("Erro ao atualizar:", error);
             if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                toast.error(`Por favor, cheque a disponibilidade dos dados que você inseriu.`);
            }
        }
    };

    return (
        <div className="container">
            <div className="form-actions">
            <img src='/images/seta-esquerda.png' onClick={() => navigate('/alunos')} className='icon-voltar'></img>

                </div>
            <h1>Editar Aluno</h1>
            <form onSubmit={handleSubmit}>
                 <div className="form-group"><label>Nome</label><input type="text" name="nome" value={aluno.nome} onChange={handleChange} required /></div>
                <div className="form-group"><label>Endereço</label><input type="text" name="endereco" value={aluno.endereco} onChange={handleChange} required /></div>
                <div className="form-group"><label>Data de Nascimento</label><input type="date" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} required /></div>
                <div className="form-group"><label>CPF</label><input type="text" name="cpf" value={aluno.cpf} onChange={handleChange} required /></div>
                <div className="form-group"><label>Matrícula</label><input type="text" name="matricula" value={aluno.matricula} onChange={handleChange} required /></div>
                <div className="form-group"><label>Telefone</label><input type="tel" name="telefone" value={aluno.telefone} onChange={handleChange} required /></div>
                <div className="form-group"><label>Email</label><input type="email" name="email" value={aluno.email} onChange={handleChange} required /></div>
                <div className="form-group"><label>Curso</label><input type="text" name="curso" value={aluno.curso} onChange={handleChange} required /></div>

                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}