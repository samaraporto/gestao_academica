import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function UpdateDisciplina() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [disciplina, setDisciplina] = useState({ nome: '', cargaHoraria: '' });

    useEffect(() => {
        const fetchDisciplina = async () => {
            try {
                const response = await api.get(`/disciplinas/${id}`);
                setDisciplina(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados da disciplina:", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchDisciplina();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDisciplina(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/disciplinas/${id}`, {
                ...disciplina,
                cargaHoraria: Number(disciplina.cargaHoraria)
            });
            toast.success('Disciplina atualizada com sucesso!');
            navigate('/disciplinas');
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                toast.error(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className="container">
            <h1>Editar Disciplina</h1>
            <form onSubmit={handleSubmit}>
                {/* <button type="button" onClick={() => navigate('/disciplinas')} className="btn-voltar"><img src='/images/seta-esquerda.png' className='icon-voltar'></img></button> */}
                <img src='/images/seta-esquerda.png' onClick={() => navigate('/disciplinas')} className='icon-voltar'></img>

                <div className="form-group">
                    <label>Nome da Disciplina*</label>
                    <input type="text" name="nome" value={disciplina.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Carga Horária (em horas)*</label>
                    <input type="number" name="cargaHoraria" value={disciplina.cargaHoraria} onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit">Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}