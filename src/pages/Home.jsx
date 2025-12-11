import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// MODALES IMPORTS
import ProfileCreationModal from "../components/ProfileCreationModal"; 
import CreateBandModal from "../components/CreateBandModal"; 
import LoginModal from "../components/LoginModal";       
import RegisterModal from "../components/RegisterModal"; 

import { useAuth } from "../context/AuthContext"; 
import api from "../api/axiosConfig"; 

import BandasDestacadas from "../components/BandasDestacadas";
import ArtistasDestacados from "../components/ArtistasDestacados.jsx";
import TusListas from "../components/TusListas"; 

// Estilos
import "../styles/hero.css"
import "../styles/footer.css"
import "../styles/artistasDestacados.css"
import "../styles/bandasDestacadas.css"
import "../styles/home.css"

export default function Home() {
    const navigate = useNavigate();
    
    // 1. ESTADOS DE AUTENTICACIÓN Y CONTROL
    const { isAuthenticated, profile } = useAuth(); 
    
    // Estados de Modales
    const [isLoginOpen, setIsLoginOpen] = useState(false);       
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); 
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
    const [isBandModalOpen, setIsBandModalOpen] = useState(false); 
    
    // 2. ESTADOS DE DATOS
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [allProfiles, setAllProfiles] = useState([]);
    const [allBands, setAllBands] = useState([]);
    const [errorData, setErrorData] = useState(null);

    // 3. CARGAR DATOS (Público)
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [profilesRes, bandsRes] = await Promise.all([
                    api.get('/api/profiles'),
                    api.get('/api/bands') 
                ]);
                
                setAllProfiles(profilesRes.data);
                setAllBands(bandsRes.data);
                setErrorData(null); 

            } catch (err) {
                console.error("Error cargando home:", err);
                setErrorData("No pudimos cargar la comunidad en este momento."); 
            } finally {
                setIsLoadingData(false);
            }
        };
        
        fetchHomeData();
    }, []);

    // Funciones para alternar entre Login y Registro
    const openLogin = () => { setIsRegisterOpen(false); setIsLoginOpen(true); };
    const openRegister = () => { setIsLoginOpen(false); setIsRegisterOpen(true); };

    return (
        <div className="app-container">
            {/* PASAMOS LAS FUNCIONES AL NAVBAR */}
            <Navbar 
                onOpenLogin={openLogin} 
                onOpenRegister={openRegister} 
            />

            <main className="main-content">
                
                {/* --- SECCIÓN HERO (ESTILO ORIGINAL RESTAURADO) --- */}
                <section className="hero-container">
                    <div className="hero-content">
                        {/* Usamos <p> con la clase hero-text original para mantener tu estilo */}
                        <h1 className="hero-title">
                            ¡Conecta con músicos de tu zona <br /> y <span className="highlight">forma tu próxima banda!</span>
                        </h1>
                        
                        <p className="hero-text2">
                            JamTogether es la comunidad que conecta a guitarristas, vocalistas<br />
                            y todo tipo de músicos que quieren formar proyectos reales.<br />
                            Filtra por estilo, ciudad o instrumento y encuentra tu banda.<br />
                        </p>
                        
                        <div className="botonera">
                            {!isAuthenticated ? (
                                // NO LOGUEADO: Botones originales abriendo Modales
                                <>
                                    <button className="btn" onClick={openRegister}>
                                        Regístrate aquí
                                    </button>
                                    <button className="btn-2" onClick={openLogin}>
                                        Iniciar Sesión
                                    </button>
                                </>
                            ) : !profile ? (
                                // LOGUEADO SIN PERFIL
                                <button className="btn" onClick={() => setIsProfileModalOpen(true)}>
                                    Crea tu Perfil
                                </button>
                            ) : (
                                // LOGUEADO CON PERFIL
                                <button className="btn" onClick={() => setIsBandModalOpen(true)}>
                                    Formar una Banda
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- SECCIONES DE DATOS --- */}
                
                {isLoadingData && (
                    <div className="loading-container"><p>Cargando el escenario...</p></div>
                )}

                {errorData && (
                    <div className="error-container"><p>{errorData}</p></div>
                )}

                {!isLoadingData && !errorData && (
                    <>
                        {/* --- SECCIÓN ARTISTAS --- */}
                        {allProfiles.length > 0 && (
                            <>
                                <h1 className="titulo-artistashome" style={{textAlign: 'center', marginTop: '40px', marginBottom: '20px', fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)'}}>
                                    ¿Buscas un integrante?
                                </h1>
                                
                                <ArtistasDestacados 
                                    artistas={allProfiles.slice(0, 5)} 
                                    titulo="" /* Título vacío para evitar duplicados */
                                />
                            </>
                        )}

                        {/* --- SECCIÓN BANDAS --- */}
                        {allBands.length > 0 && (
                            <>
                                <h1 className="titulo-bandashome" style={{textAlign: 'center', marginTop: '60px', marginBottom: '20px', fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)'}}>
                                    ¡Encuentra tu banda!
                                </h1>

                                <BandasDestacadas 
                                    bandas={allBands.slice(0, 5)} 
                                    layout="vertical" 
                                    titulo="" /* Título vacío para evitar duplicados */
                                />
                            </>
                        )}

                        {/* TUS LISTAS */}
                        <TusListas />
                    </>
                )}
            </main>

            <Footer />

            {/* --- TODOS LOS MODALES RENDERIZADOS AQUÍ --- */}
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={openRegister}
            />
            <RegisterModal 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={openLogin}
            />
            <ProfileCreationModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />
            <CreateBandModal 
                isOpen={isBandModalOpen} 
                onClose={() => setIsBandModalOpen(false)} 
            />
        </div>
    );
}