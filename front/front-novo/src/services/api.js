import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

// Interceptor de REQUISIÇÃO (adiciona o token antes de enviar)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// --- INTERCEPTOR DE RESPOSTA (A PARTE NOVA E IMPORTANTE) ---
// Isso será executado DEPOIS de cada resposta do backend
api.interceptors.response.use(
    // Se a resposta for bem-sucedida (status 2xx), apenas a retorna
    (response) => {
        return response;
    },
    // Se a resposta for um erro...
    (error) => {
        // Verificamos se o erro é de "Não Autorizado" (token inválido/expirado)
        if (error.response && error.response.status === 401) {
            console.log("Sessão inválida. Fazendo logout automático.");
            
            // Limpa o armazenamento local
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redireciona o usuário para a página de login
            // Usamos window.location para forçar o redirecionamento fora de um componente React
            window.location.href = '/login';
        }

        // Para outros erros, apenas os rejeita para que o componente possa tratá-los
        return Promise.reject(error);
    }
);

export default api;