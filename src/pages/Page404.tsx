import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/404-gamer.png" // Reemplaza con la ruta de tu imagen de 404 (si tienes una)
        alt="404"
        className="w-80 mb-7 bg-black rounded-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      />
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl mt-4">¡Oops! Página no encontrada.</p>
      <p className="text-gray-400 mt-2">
        Parece que te has perdido en el ciberespacio.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors mb-5"
      >
        Volver al inicio
      </Link>
      
    </motion.div>
  );
};

export default Page404;
