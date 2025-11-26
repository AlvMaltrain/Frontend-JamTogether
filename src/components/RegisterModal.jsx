import React, { useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/modal.css';
import '../styles/styleRegistro.css'; // Reutilizamos estilos

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    username: '', email: '', password: '', password2: '',
    city: '', edad: '', instrumento: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validaciones simples
    if (formData.password !== formData.password2) { setError("Las contraseñas no coinciden"); return; }
    if (formData.username.length < 5) { setError("El usuario debe tener 5+ caracteres"); return; }

    try {
      // 1. Crear cuenta en AWS
      const response = await api.post('/api/auth/register', {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200 || response.status === 201) {
        // 2. Guardar datos para el perfil
        const edadNum = parseInt(formData.edad);
        let perfilData = {
          nombrePublico: formData.username,
          city: formData.city,
          edad: isNaN(edadNum) ? 0 : edadNum,
          instrumento: formData.instrumento,
        };
        localStorage.setItem('perfilPendiente', JSON.stringify(perfilData));

        alert('¡Cuenta creada! Inicia sesión para activar tu perfil.');
        
        // 3. Cambiar al modal de Login
        onSwitchToLogin();
      }
    } catch (err) {
      let msg = "Error de conexión";
      if (err.response && err.response.data) msg = err.response.data;
      setError(msg);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="registro-container" style={{ boxShadow: 'none', padding: 0, border: 'none', maxWidth: '100%' }}>
          <h2 style={{marginTop: 0}}>Únete a JamTogether</h2>
          {error && <div className="error-msg">{error}</div>}

          <form id="myForm" onSubmit={handleSubmit} className="modal-form">
            <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Nombre de Usuario" required />
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
              <input type="password" id="password2" value={formData.password2} onChange={handleChange} placeholder="Repetir" required />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" id="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" required />
              <input type="number" id="edad" value={formData.edad} onChange={handleChange} placeholder="Edad" style={{ width: '80px' }} required />
            </div>

            <select id="instrumento" value={formData.instrumento} onChange={handleChange} required>
              <option value="">Instrumento Principal</option>
              <option value="guitarra">Guitarra</option>
              <option value="bajo">Bajo</option>
              <option value="batería">Batería</option>
              <option value="teclado">Teclado</option>
              <option value="voz">Voz</option>
            </select>

            <button type="submit">Registrarse</button>

            <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.9rem' }}>
              <span style={{ color: '#666' }}>¿Ya tienes cuenta? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;