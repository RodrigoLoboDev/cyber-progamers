import { motion } from 'framer-motion'; // Para animaciones
import { useAuthState } from 'react-firebase-hooks/auth'; // Para manejar el estado de autenticación
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNoticias } from '../services/noticiasAPI';
import { getImagenes } from '../services/galeriaAPI';


export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [countNoticias, setCountNoticias] = useState<number>(0);
  const [countImages, setCountImages] = useState<number>(0); // Estado para imágenes
  const [animatedCountNoticias, setAnimatedCountNoticias] = useState<number>(0);
  const [animatedCountImages, setAnimatedCountImages] = useState<number>(0); // Estado animado para imágenes

  // Fetch de noticias
  useEffect(() => {
    const fetchNoticias = async () => {
      const noticias = await getNoticias();
      if (noticias) {
        setCountNoticias(noticias.length);
      }
    };
    fetchNoticias();
  }, []);

  // Fetch de imágenes
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImagenes();
      if (images) {
        setCountImages(images.length);
      }
    };
    fetchImages();
  }, []);

  // Animación para noticias
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / countNoticias), 20);
    const interval = setInterval(() => {
      start += 1;
      setAnimatedCountNoticias((prev) => Math.min(prev + 1, countNoticias));
      if (start >= countNoticias) {
        clearInterval(interval);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [countNoticias]);

  // Animación para imágenes
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / countImages), 20);
    const interval = setInterval(() => {
      start += 1;
      setAnimatedCountImages((prev) => Math.min(prev + 1, countImages));
      if (start >= countImages) {
        clearInterval(interval);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [countImages]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-xl"
    >
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido al Panel Administrativo</h1>

      {/* Bienvenida personalizada */}
      {user && (
        <p className="mt-4 text-lg text-gray-600">
          Hola, <strong>{user.displayName || 'Usuario'}</strong>! Estás conectado con tu cuenta de {user.email}.
        </p>
      )}

      {/* Estadísticas o resúmenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-4 shadow-lg">
          <h3 className="text-2xl font-semibold">Noticias</h3>
          <p className="mt-2 text-lg">
            <span className="font-black">{animatedCountNoticias}</span> Noticias Publicadas
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg p-4 shadow-lg">
          <h3 className="text-2xl font-semibold">Usuarios</h3>
          <p className="mt-2 text-lg">1 Usuarios Registrados</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg p-4 shadow-lg">
          <h3 className="text-2xl font-semibold">Imágenes en la Galería</h3>
          <p className="mt-2 text-lg">
            <span className="font-black">{animatedCountImages}</span> Imágenes Subidas
          </p>
        </div>
      </div>

      {/* Enlaces rápidos o botones de acceso */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/admin/noticias"
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
        >
          Ver Noticias
        </Link>
        <Link
          to="/admin/galeria"
          className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
        >
          Gestionar Galería
        </Link>
      </div>
    </motion.div>
  );
}
