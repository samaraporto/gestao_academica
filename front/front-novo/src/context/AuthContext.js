import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. O estado agora guarda um objeto com token e usuário
    const [authState, setAuthState] = useState(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        try {
            return { token, user: user ? JSON.parse(user) : null };
        } catch (error) {
            return { token: null, user: null };
        }
    });

    // 2. A função de login agora salva tanto o token quanto o usuário
    const loginAction = (data) => {
        const { token, user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, user });
    };

    // 3. A função de logout limpa ambos
    const logoutAction = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null });
    };

    // 4. O valor do provedor agora é o objeto de estado completo
    const value = { authState, loginAction, logoutAction };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};