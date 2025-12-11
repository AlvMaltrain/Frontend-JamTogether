import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Estado para guardar los datos del perfil del músico
    const [profile, setProfile] = useState(null); 
    
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // FUNCIÓN PARA BUSCAR EL PERFIL DEL USUARIO LOGUEADO
    const fetchUserProfile = async (userEmail) => {
        try {
            const response = await api.get('/api/profiles');
            const userProfile = response.data.find(p => p.userEmail === userEmail);
            
            if (userProfile) {
                setProfile(userProfile); // Guardamos el perfil completo
            } else {
                setProfile(null); // No tiene perfil aun
            }
        } catch (error) {
            console.error("Error al cargar perfil en el contexto:", error);
            setProfile(null);
        }
    };

    // Al cargar la pagina, revisamos si ya hay un token guardado
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token); 
                    if (decoded.exp * 1000 < Date.now()) {
                        logout();
                    } else {
                        const userEmail = decoded.sub;
                        setUser(userEmail);
                        setIsAuthenticated(true);
                  
                        fetchUserProfile(userEmail); 
                    }
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);


    // --- FUNCIÓN DE LOGIN ---
    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
            
            const decoded = jwtDecode(token);
            const userEmail = decoded.sub;
            
            setUser(userEmail);
            setIsAuthenticated(true);
            
            // Cargar perfil inmediatamente después del login
            await fetchUserProfile(userEmail); 
            
            return { success: true, userEmail: userEmail };
        } catch (error) {
            return { success: false, message: error.response?.data || "Error al iniciar sesión" };
        }
    };

    // --- FUNCIÓN DE LOGOUT ---
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setProfile(null); // Limpiamos el perfil
        setIsAuthenticated(false);
    };

    // Lo que exportamos para que el resto de la app use
    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            profile, 
            login, 
            logout,
            loading,
            // EXPORTAMOS LA FUNCIÓN DE RECARGA DEL PERFIL
            fetchUserProfile 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto 
export const useAuth = () => useContext(AuthContext);