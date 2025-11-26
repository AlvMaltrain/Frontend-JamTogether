import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/modal.css'; // Usamos el estilo compartido del modal
import '../styles/styleLogin.css'; // Reutilizamos el estilo del formulario

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (email.trim() === '' || password.trim() === '') {
      setError('Completa todos los campos');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      // ÉXITO: Cerramos el modal. El Home detectará el cambio de estado y mostrará tu nombre.
      onClose();
    } else {
      setError(result.message || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="login-container" style={{ boxShadow: 'none', padding: 0, border: 'none', maxWidth: '100%' }}>
          <h2 style={{marginTop: 0}}>Iniciar Sesión</h2>
          
          {error && <div className="error-msg">{error}</div>}

          <form id="loginForm" onSubmit={handleSubmit} className="modal-form">
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Entrar</button>

            <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
              <span style={{ color: '#666' }}>¿No tienes cuenta? </span>
              <button
                type="button"
                onClick={onSwitchToRegister}
                style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;