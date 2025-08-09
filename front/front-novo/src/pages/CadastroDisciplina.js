import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify'; 

export default function CadastroDisciplina() {
    const navigate = useNavigate();
    const [disciplina, setDisciplina] = useState({ nome: '', cargaHoraria: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDisciplina(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/disciplinas', {
                ...disciplina,
                cargaHoraria: Number(disciplina.cargaHoraria) 
            });
            toast.success('Disciplina cadastrada com sucesso!');
            navigate('/disciplinas');
        } catch (error) {
            console.error("Erro no cadastro:", error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                 toast.error(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className="container">
            <h1>Cadastrar Nova Disciplina</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome da Disciplina*</label>
                    <input type="text" name="nome" value={disciplina.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Carga Horária (em horas)*</label>
                    <input type="number" name="cargaHoraria" value={disciplina.cargaHoraria} onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit">Cadastrar</button>
                    <Link to="/disciplinas" className="btn-voltar">Voltar</Link>
                </div>
            </form>
        </div>
    );
}