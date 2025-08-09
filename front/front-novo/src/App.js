import React, { useState } from 'react'; // 1. Importe o 'useState'
import { BrowserRouter, Link, useNavigate, useLocation } from 'react-router-dom';
import RoutesApp from './routesapp';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import { ToastContainer } from 'react-toastify'; // <-- 1. IMPORTE AQUI
import 'react-toastify/dist/ReactToastify.css'; 


function AppLayout() {
  const { authState, logoutAction } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    logoutAction();
    navigate('/login');
  };

  return (
    <div className="App">
      <header>
        <nav className="main-nav">
          <h1>Gestão Acadêmica</h1>
          
          {authState.token && (
            <div className="nav-right">
              <div className={`nav-links ${menuAberto ? 'open' : ''}`}>
                
                <button className="close-menu-button" onClick={() => setMenuAberto(false)}>
                </button>

                <span className="welcome-message">
                  Bem-vindo, {authState.user ? authState.user.name : 'Usuário'}
                </span>
                <Link to="/alunos" onClick={() => setMenuAberto(false)}>Alunos</Link>
                <Link to="/disciplinas" onClick={() => setMenuAberto(false)}>Disciplinas</Link>
                <Link to="/gerenciar-disciplinas" onClick={() => setMenuAberto(false)}>Gerenciar</Link>
                <Link to="/consulta" onClick={() => setMenuAberto(false)}>Consulta</Link>
              </div>

              {/* Ações do header (Logout e Hambúrguer) */}
              <div className="header-actions">
                <button onClick={handleLogout} className="btn-logout">Logout</button>
                <button className="hamburger-button" onClick={() => setMenuAberto(!menuAberto)}>
                  ☰
                </button>
              </div>
            </div>
          )}
        </nav>
        {authState.token && <hr />}
      </header>
      <main>
        <RoutesApp />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;