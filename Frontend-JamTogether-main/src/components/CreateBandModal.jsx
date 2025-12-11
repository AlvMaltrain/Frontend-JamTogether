import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import '../styles/modal.css'; 

const CreateBandModal = ({ isOpen, onClose }) => {
    
    if (!isOpen) return null;

    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
        nombreBanda: '', 
        descripcion: '', 
        ubicacion: '', 
        buscandoMusicos: true,
        imageUrl: '',
        genreIds: [],             // Géneros que toca la banda
        seekingInstrumentIds: []  // Instrumentos que busca la banda
    });

    const [instrumentos, setInstrumentos] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Cargar catálogos
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
                setError("No se pudieron cargar las listas.");
            } finally {
                setLoading(false);
            }
        };
        if (isOpen) cargarDatos();
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };
    
    // Manejador para selects múltiples
    const handleMultiSelect = (e, field) => {
        const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData({ ...formData, [field]: values });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. POST para crear la banda
            await api.post('/api/bands', formData);
            
            alert("¡Banda creada con éxito!");
            onClose(); 
        
            window.location.reload(); 
        } catch (err) {
            setError(err.response?.data || "Error al crear la banda. Asegúrate de tener un Perfil de Músico primero.");
        }
    };

    if (loading) return <div className="modal-overlay"><div className="modal-content">Cargando...</div></div>;
    
    return (
        <div className="modal-overlay" onClick={onClose}> 
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>X</button>
                
                <h2 style={{marginBottom: '10px'}}>Forma tu Banda</h2>
                <p style={{marginBottom: '15px', color: '#666', fontSize: '0.9rem'}}>
                    Crea un proyecto y encuentra a los músicos que te faltan.
                </p>
                
                {error && <div className="error-msg">{error}</div>}
                
                <form onSubmit={handleSubmit} className="modal-form">
                    
                    {/* FOTO DE LA BANDA */}
                    <div style={{background: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '5px', border: '1px solid #eee'}}>
                        <label>Logo / Foto de la Banda (URL)</label>
                        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                            <div style={{
                                width: '60px', height: '60px', 
                                borderRadius: '8px', background: '#e0e0e0', overflow: 'hidden',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                flexShrink: 0
                            }}>
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" style={{width:'100%', height:'100%', objectFit:'cover'}} onError={(e) => {e.target.style.display='none'}} />
                                ) : (
                                    <span style={{fontSize:'24px'}}>🎸</span>
                                )}
                            </div>
                            <div style={{flex: 1}}>
                                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Nombre del Proyecto</label>
                        <input type="text" name="nombreBanda" value={formData.nombreBanda} onChange={handleChange} required />
                    </div>

                    <div>
                        <label>Ubicación (Ciudad/Sala de Ensayo)</label>
                        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                    </div>
                    
                    <div>
                        <label>Descripción (Estilo, influencias, horarios)</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required rows="3" />
                    </div>

                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                        <div>
                            <label>Géneros que tocan (Ctrl+Clic)</label>
                            <select multiple onChange={(e) => handleMultiSelect(e, 'genreIds')} style={{height:'100px', width: '100%'}}>
                                {generos.map(g => <option key={g.id} value={g.id}>{g.nombreGenero}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>¿Qué instrumentos buscan?</label>
                            <select multiple onChange={(e) => handleMultiSelect(e, 'seekingInstrumentIds')} style={{height:'100px', width: '100%'}}>
                                {instrumentos.map(i => <option key={i.id} value={i.id}>{i.nombreInstrumento}</option>)}
                            </select>
                        </div>
                    </div>

                    <label style={{display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', marginTop: '5px'}}>
                        <input type="checkbox" name="buscandoMusicos" checked={formData.buscandoMusicos} onChange={handleChange} style={{width:'auto'}} />
                        <span>Activamos búsqueda de músicos</span>
                    </label>

                    <button type="submit" style={{marginTop: '10px'}}>Crear Banda</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBandModal;