import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
    const navigate = useNavigate();

    // Estados para os campos do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }

        try {
            // 2. Chama a API de registro que criamos no back-end
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();
            if (!response.ok) {
                // Captura erros do backend (ex: email já em uso)
                throw new Error(data.error || "Falha ao registrar");
            }

            // 3. Se o registro for bem-sucedido, avisa o usuário e o redireciona
            toast.success("Usuário registrado com sucesso! Por favor, faça o login.");
            navigate('/login'); // Redireciona para a página de login

        } catch (error) {
            toast.error(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <h1>Registrar Novo Usuário</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirmar Senha</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Faça o login</Link>
            </p>
        </div>
    );
}