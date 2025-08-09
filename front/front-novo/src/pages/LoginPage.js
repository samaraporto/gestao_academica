import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const navigate = useNavigate();
    const { authState, loginAction } = useAuth();

    useEffect(() => {
        if (authState.token) {
            navigate('/alunos');
        }
    }, [authState.token, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Falha no login");
            }
            loginAction(data);
            navigate('/alunos');
        } catch (error) {
            toast.error(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="login-page-container">
            
            <div className="login-image-side">
                <img src="/images/login-image.png" alt="Ilustração de ambiente acadêmico" />
            </div>

            <div className="login-form-side">
                <div className="login-form-wrapper">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                    <p>
                        Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}