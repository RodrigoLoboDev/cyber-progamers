import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Para íconos de editar y eliminar
import { noticiaType } from '../types';
import { deleteNoticia, getNoticias } from '../services/noticiasAPI';
import SNoticiaPage from '../components/skeleton/SNoticiaPage';
import { toast } from 'react-toastify';



const AdminNoticias = () => {
  const [noticias, setNoticias] = useState<noticiaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGetNoticias = async () => {
      try {
        const noticias = await getNoticias();
        if (noticias) {
          setNoticias(noticias);
        }
      } catch (err) {
        setError("Error al cargar las noticias. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchGetNoticias();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto w-[95%]">
        <h1 className="text-3xl font-bold text-gray-800">Cargando Noticias</h1>
        <div className="grid gap-4 grid-cols-1 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SNoticiaPage key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto w-[95%] text-center mt-10">
        <p className="text-red-600 font-bold">{error}</p>
      </section>
    );
  }

  const handleConfirm = (id: string) => {
    toast.error(
      ({ closeToast }) => (
        <div>
          <p>¿Estas seguro que quieres eliminar esta Noticia?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
              className="bg-red-600 text-white py-1 w-full rounded hover:bg-red-800 transition-all"
            >
              Sí
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-400 text-white py-1 w-full rounded hover:bg-gray-600 transition-all"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false, // Para que no se cierre automáticamente
        closeOnClick: false,
        draggable: false
      }
    );
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteNoticia(id)
      if (response) {
        // Actualiza el estado local eliminando la noticia con el ID correspondiente
        setNoticias((prevNoticias) => prevNoticias.filter((noticia) => noticia.id !== id));
        toast.error(response.message, {
          pauseOnHover: false, // asi no se pause cuando pasas el puntero del mause
          pauseOnFocusLoss: false
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-xl"
    >
      <h1 className="text-3xl font-bold text-gray-800">Gestión de Noticias</h1>

      {/* Botón para agregar una nueva noticia */}
      <Link
        to="/admin/noticias/nueva"
        className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all mt-6 inline-block"
      >
        Agregar Nueva Noticia
      </Link>

      {/* Listado de noticias */}
      <div className="mt-6 space-y-4">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{noticia.titulo}</h3>
              <p className="text-gray-600">{noticia.descripcion}</p>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center space-x-4">
              <Link
                to={`/admin/noticias/${noticia.id}/editar`}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit size={20} />
              </Link>
              <button
                onClick={() => handleConfirm(noticia.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminNoticias;
