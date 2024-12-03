import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CyberLayout from "./layouts/CyberLayout";
import AdminLayout from "./layouts/AdminLayout";
import IndexPage from "./pages/IndexPage";
import ServiciosPage from "./pages/ServiciosPage";
import FAQPage from "./pages/FAQPage";
import Page404 from "./pages/Page404";
import NoticiasPage from "./pages/NoticiasPage";
import NoticiaDetailPage from "./pages/NoticiaDetailPage ";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente de protección
import Dashboard from "./pages/Dashboard";
import AdminNoticias from "./pages/AdminNoticias";
import AdminNuevaNoticia from "./pages/AdminNuevaNoticia";
import AdminEditarNoticia from "./pages/AdminEditarNoticia";
import AdminGaleria from "./pages/AdminGaleria";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Rutas públicas */}
                <Route element={<CyberLayout />}>
                    <Route
                        index
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <IndexPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="servicios"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ServiciosPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="noticias-y-eventos"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NoticiasPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="noticias-y-eventos/:id"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NoticiaDetailPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="faq"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FAQPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Page404 />
                            </motion.div>
                        }
                    />
                </Route>

                {/* Rutas protegidas */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Página principal del área administrativa */}
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    {/* Gestión de noticias */}
                    <Route
                        path="noticias"
                        element={<AdminNoticias />}
                    />

                    {/* Nueva noticia */}
                    <Route
                        path="noticias/nueva"
                        element={<AdminNuevaNoticia />}
                    />

                    {/* Editar una noticia */}
                    <Route
                        path="noticias/:id/editar"
                        element={<AdminEditarNoticia />}
                    />

                    {/* Gestión de galeria */}
                    <Route
                        path="galeria"
                        element={<AdminGaleria />}
                    />
                </Route>

                {/* Página de inicio de sesión */}
                <Route
                    path="/login"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <LoginPage />
                        </motion.div>
                    }
                />

            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
