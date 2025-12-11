import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/homeIMG/logo.png";
import "../styles/navbar.css";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar({ onOpenLogin, onOpenRegister }) {
    const navigate = useNavigate();
    const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    
    const { isAuthenticated, profile, logout, loading } = useAuth(); 

    // Estado para el móvil (hamburguesa)
    const [isOpen, setIsOpen] = useState(false);
    
    // Función para cerrar el menú al hacer click
    const closeMenu = () => setIsOpen(false);

    if (loading) return <header className="navbar">Cargando...</header>; 

    const getUserAvatar = () => {
        if (profile && profile.imageUrl) return profile.imageUrl;
        const name = profile ? profile.nombrePublico : "User";
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
    };

    const renderAuthButtons = () => {
        if (!isAuthenticated) {
            //  A: NO LOGUEADO -> Botones que abren modales
            return (
                <>
                    <button className="btn-secondary" onClick={() => { onOpenRegister(); closeMenu(); }}>
                        Registrarse
                    </button>
                    <button className="btn-primary" onClick={() => { onOpenLogin(); closeMenu(); }}>
                        Iniciar Sesión
                    </button>
                </>
            );
        }

        // B: LOGUEADO CON PERFIL
        if (profile) {
            return (
                <div className="user-profile-actions">
                    <img 
                        src={getUserAvatar()} 
                        alt="Avatar" 
                        className="user-avatar"
                        onError={(e) => { e.target.src = getUserAvatar(); }} 
                    />
                    <span className="welcome-name">
                        Hola, {profile.nombrePublico}
                    </span>
                    <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>
                        Salir
                    </button>
                </div>
            );
        }

        // C: LOGUEADO SIN PERFIL
        return (
            <>
                <button className="btn-primary" onClick={() => { navigate("/"); closeMenu(); }}>
                    Crea tu Perfil
                </button>
                <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>
                    Salir
                </button>
            </>
        );
    };

    return (
        <header className="navbar">
            <div className="logo-container" onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" className="logo" />
                <h2>JamTogether</h2>
            </div>

            {/* BOTÓN HAMBURGUESA (Movil) */}
            <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* MENÚ DE NAVEGACIÓN */}
            <div className={`nav-center ${isOpen ? "open" : ""}`}>
                <ul className="nav-links">
                    <li>
                        <NavLink 
                            to="/" 
                            end 
                            className={({ isActive }) => (isActive ? "active" : "")} 
                            onClick={() => { goTop(); closeMenu(); }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/buscar-bandas" 
                            className={({ isActive }) => (isActive ? "active" : "")} 
                            onClick={() => { goTop(); closeMenu(); }}
                        >
                            Explorar Bandas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/buscar-artistas" 
                            className={({ isActive }) => (isActive ? "active" : "")} 
                            onClick={() => { goTop(); closeMenu(); }}
                        >
                            Explorar Artistas
                        </NavLink>
                    </li>
                </ul>

                {/* Botones en versión móvil (menu desplegable) */}
                <div className="nav-auth-actions-mobile">
                    {renderAuthButtons()}
                </div>
            </div>

            {/* Botones desktop (fuera del menu desplegable) */}
            <div className="nav-auth-actions-desktop">
                {renderAuthButtons()}
            </div>
        </header>
    );
}