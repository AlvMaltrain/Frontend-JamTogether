import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/modal.css';

const ProfileCreationModal = ({ isOpen, onClose }) => {
    
    // Si no está abierto, no renderizamos nada
    if (!isOpen) return null;

    const navigate = useNavigate();
    const { user, fetchUserProfile } = useAuth(); 
  
    // Estado inicial del formulario (Carga datos pendientes del registro si existen)
    const [formData, setFormData] = useState(() => {
        const pendingData = localStorage.getItem('perfilPendiente');
        if (pendingData) {
            const parsedData = JSON.parse(pendingData);
            return {
                nombrePublico: parsedData.username || '', 
                ubicacion: parsedData.city || '', 
                bio: '', 
                buscandoBanda: true,
                instrumentIds: [], 
                genreIds: [],
                imageUrl: '' 
            };
        }
        return { 
            nombrePublico: '', 
            bio: '', 
            ubicacion: '', 
            buscandoBanda: true, 
            instrumentIds: [], 
            genreIds: [], 
            imageUrl: '' 
        };
    });

    const [instrumentos, setInstrumentos] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Cargar listas de instrumentos y géneros al abrir el modal
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resInst, resGen] = await Promise.all([
                    api.get('/api/instruments'),
                    api.get('/api/genres')
                ]);
                setInstrumentos(resInst.data);
                setGeneros(resGen.data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las listas desde el servidor.");
            } finally {
                setLoading(false);
            }
        };
        if (isOpen) cargarDatos();
    }, [isOpen]);

    // Manejadores de cambios en el formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };
    
    const handleInstrumentChange = (e) => {
        const seleccionados = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({ ...formData, instrumentIds: seleccionados });
    };
    
    const handleGenreChange = (e) => {
        const seleccionados = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({ ...formData, genreIds: seleccionados });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Guardar en AWS
            await api.post('/api/profiles', formData);
            
            // 2. Limpiar datos temporales
            localStorage.removeItem('perfilPendiente');
            
            // 3. Actualizar el contexto global para que el Navbar muestre la foto/nombre
            await fetchUserProfile(user); 
            
            alert("¡Perfil creado con éxito!");
            onClose(); 
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data || "Error al crear el perfil.");
        }
    };

    if (loading) return <div className="modal-overlay"><div className="modal-content">Cargando datos...</div></div>;
    
    return (
        <div className="modal-overlay" onClick={onClose}> 
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>X</button>
                
                <h2 style={{marginBottom: '10px'}}>Crea tu Perfil de Músico</h2>
                <p style={{marginBottom: '15px', fontSize: '0.9rem', color: '#666'}}>
                    Usuario: <b>{user}</b>
                </p>
                
                {error && <div className="error-msg">{error}</div>}
                
                <form onSubmit={handleSubmit} className="modal-form">
                    
                    {/* --- SECCION DE FOTO CON PREVIEW --- */}
                    <div style={{
                        background: '#f9f9f9', 
                        padding: '15px', 
                        borderRadius: '8px', 
                        marginBottom: '10px',
                        border: '1px solid #eee'
                    }}>
                        <label>Foto de Perfil (URL)</label>
                        <div style={{display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px'}}>
                            {/* Preview de Imagen */}
                            <div style={{
                                width: '60px', height: '60px', 
                                borderRadius: '50%', background: '#e0e0e0', overflow: 'hidden',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                flexShrink: 0
                            }}>
                                {formData.imageUrl ? (
                                    <img 
                                        src={formData.imageUrl} 
                                        alt="Preview" 
                                        style={{width:'100%', height:'100%', objectFit:'cover'}} 
                                        onError={(e) => {e.target.style.display='none'}} 
                                    />
                                ) : (
                                    <span style={{fontSize:'24px'}}>📷</span>
                                )}
                            </div>
                            
                            <div style={{flex: 1}}>
                                <input 
                                    type="url" 
                                    name="imageUrl" 
                                    value={formData.imageUrl} 
                                    onChange={handleChange} 
                                    placeholder="Pega aquí el link de tu imagen (ej: google drive, imgur...)" 
                                />
                            </div>
                        </div>
                    </div>
        

                    <div>
                        <label>Nombre Artístico:</label>
                        <input type="text" name="nombrePublico" value={formData.nombrePublico} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Ubicación (Ciudad):</label>
                        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                    </div>
                    
                    <div>
                        <label>Biografía:</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} required rows="3" style={{resize: 'vertical'}} />
                    </div>

                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                        <div>
                            <label>Instrumentos (Ctrl+Clic):</label>
                            <select multiple onChange={handleInstrumentChange} style={{height:'100px', width: '100%'}}>
                                {instrumentos.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.nombreInstrumento}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Géneros (Ctrl+Clic):</label>
                            <select multiple onChange={handleGenreChange} style={{height:'100px', width: '100%'}}>
                                {generos.map(gen => (
                                <option key={gen.id} value={gen.id}>{gen.nombreGenero}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <label style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', marginTop: '5px'}}>
                        <input type="checkbox" name="buscandoBanda" checked={formData.buscandoBanda} onChange={handleChange} style={{width:'auto'}} />
                        <span>¿Buscas banda activamente?</span>
                    </label>

                    <button type="submit" style={{marginTop: '15px'}}>Guardar Perfil</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCreationModal;