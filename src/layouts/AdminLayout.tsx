import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logo from "../components/Logo";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebaseConfig";
import { signOut } from 'firebase/auth';
import { MdHome, MdExitToApp } from 'react-icons/md';

export default function AdminLayout() {
    const [user] = useAuthState(auth);  // Obtiene el estado de autenticación del usuario
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Encabezado */}
            <header className="bg-gray-800 text-white py-4 shadow-xl">
                <div className="container mx-auto w-[95%] flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    {/* Logo */}
                    <Link to="/admin" className="flex flex-col md:flex-row items-center space-x-4 w-full">
                        <div className="w-64 md:w-72">
                            <Logo />
                        </div>
                        <span className="text-xl md:text-2xl font-bold md:w-44">Panel Administrativo</span>
                    </Link>

                    {/* Links y botón de logout */}
                    <div className="flex items-center justify-center lg:justify-end mt-5 md:mt-0 space-x-4 w-full">
                        {/* Botón para volver al sitio principal */}
                        <Link
                            to="/"
                            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-1 md:py-2 px-3 md:px-5 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2"
                        >
                            <MdHome className="h-5 w-5" />
                            Volver al Sitio Principal
                        </Link>

                        {/* Solo mostrar el botón de logout si el usuario está autenticado */}
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white font-bold py-1 md:py-2 px-3 md:px-5 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2 "
                            >
                                <MdExitToApp className="h-5 w-5" />
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="bg-gray-900 text-white w-64 p-5 hidden md:block">
                    <nav className="space-y-4">
                        <Link
                            to="/admin/noticias"
                            className="block py-2 px-4 bg-gray-800 rounded hover:bg-gray-700"
                        >
                            Noticias
                        </Link>
                        {/* Si decides agregar más enlaces, agrégalos aquí */}
                        <Link
                            to="/admin/galeria"
                            className="block py-2 px-4 bg-gray-800 rounded hover:bg-gray-700"
                        >
                            Galeria
                        </Link>
                    </nav>
                </aside>

                {/* Contenido principal */}
                <main className="flex-grow p-5 bg-white shadow-lg">
                    <Outlet />
                </main>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
}
