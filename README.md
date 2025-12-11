JamTogether - Frontend

    Este repositorio contiene el código fuente de la interfaz de usuario para la plataforma JamTogether. Es una Single Page Application (SPA) construida con React + Vite que permite a los músicos conectarse, crear perfiles y buscar bandas en tiempo real.

Tecnologías Utilizadas

    Framework: React 18

    Build Tool: Vite 

    Lenguaje: JavaScript 

    Estilos: CSS

    Enrutamiento: React Router DOM

    Comunicación HTTP: Axios

    Gestión de Estado: React Context API (AuthContext)

    Despliegue: AWS S3 

Configuración e Instalación Local

Pasos para ejecutar el frontend en el ordenador:

1. Prerrequisitos

    Tener instalado Node.js (v16 o superior) y npm.

2. Instalación de Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

npm install

3. Configuración de API

El frontend necesita saber dónde está el backend.

Abre el archivo src/api/axiosConfig.js.

Verifica que la constante BASE_URL apunte a tu servidor backend (local o en la nube):

// Para desarrollo local:
const BASE_URL = 'http://localhost:8080';

// Para producción (AWS):
// const BASE_URL = 'http://[IP_PUBLICA_EC2]:8080';


4. Ejecución en Desarrollo

Para iniciar el servidor local de desarrollo:

npm run dev

La aplicación estará disponible en http://localhost:3000 (o el puerto que indique la terminal).

 Características Principales

 Autenticación y Seguridad

Registro y Login: Formularios seguros que se comunican con el backend.

Persistencia: Uso de localStorage para mantener la sesión activa(sólo el token).

Interceptores: Configuración de Axios para inyectar automáticamente el Token JWT en las peticiones privadas.

Protección de Rutas: Lógica condicional para mostrar botones y accesos según el estado de autenticación.

Gestión de Usuario

Onboarding: Flujo guiado (Registro -> Login -> Crear Perfil).

Diseño y UI

Responsivo: Adaptable a móviles y escritorio (Menú hamburguesa, Grid layouts).

Estilo Moderno: Interfaz limpia con paleta de colores consistente.

Feedback Visual: Indicadores de carga (loading), mensajes de error y validaciones de formulario.

Estructura del Proyecto

El código está organizado de manera modular:

src/api: Configuración de Axios e interceptores.

src/components: Componentes reutilizables (Navbar, Footer, Modales, Tarjetas de Artistas/Bandas).

src/context: Estado global de la aplicación (AuthContext) para manejar el usuario y el token.

src/pages: Vistas principales (Home, BuscarBandas, BuscarArtistas).

src/styles: Archivos CSS modulares para cada componente.

src/assets: Imágenes y recursos estáticos.

 Despliegue en Producción

El proyecto está optimizado para desplegarse como un sitio estático.

Ejecutar el comando de construcción:

npm run build

Esto genera una carpeta dist con los archivos optimizados.

El contenido de dist se sube a un Bucket S3 de AWS configurado para alojamiento web.git