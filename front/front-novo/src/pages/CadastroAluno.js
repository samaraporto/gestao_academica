import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify'; 


export default function CadastroAluno() {
    const navigate = useNavigate();
    const [aluno, setAluno] = useState({
        nome: '', endereco: '', dataNascimento: '', cpf: '',
        matricula: '', telefone: '', email: '', curso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/alunos', aluno);
            toast.success('Aluno cadastrado com sucesso!');
            navigate('/alunos');
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            if (error.response && error.response.status === 401) {
                toast.error('Sua sessão expirou. Faça o login novamente.');
                navigate('/login');
            } else {
                const errorMessage = error.response?.data?.details || error.message;
                 toast.error('Erro ao cadastrar: Tente outra matrícula ou verifique os dados.');
            }
        }
    };

    return (
        <div className="container">
            <h1>Cadastrar Aluno</h1>
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
                    <button type="submit">Cadastrar</button>
                    <Link to="/alunos" className="btn-voltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
}