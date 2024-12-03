import { motion } from 'framer-motion';
import Heading from "../components/Heading";
import { useEffect, useState } from 'react';
import { getNoticias } from '../services/noticiasAPI';
import { noticiaType } from '../types';
import SNoticiaPage from '../components/skeleton/SNoticiaPage';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState<noticiaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // Obtener categorías únicas de las noticias
  const categorias = ["Todas", ...new Set(noticias.map((n) => n.categoria))];

   // Filtrar noticias por categoría seleccionada
   const noticiasFiltradas =
   categoriaSeleccionada === "Todas"
     ? noticias
     : noticias.filter((n) => n.categoria === categoriaSeleccionada);

  useEffect(() => {
    const fetchGetNoticias = async () => {
      try {
        const noticias = await getNoticias();

        if (noticias !== undefined) {
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
        <Heading heading="Cargando" span="Noticias" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
  

  return (
    <section className="container mx-auto w-[95%]">
      {/* Encabezado con animación */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Heading heading="Últimas Noticias" span="del Ciber" />
      </motion.div>

      {/* Filtro por categorías */}
      <div className="my-4 flex justify-center gap-4 flex-wrap">
        {categorias.map((categoria, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${categoriaSeleccionada === categoria
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Sección de noticias con animación */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {noticiasFiltradas.map((noticia, index) => (
          <motion.div
            key={index}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Imagen de la noticia */}
            {noticia.imagen && (
              <img
                src={noticia.imagen}
                alt={`Imagen de ${noticia.titulo}`}
                className="w-full h-40 object-cover rounded-t-md mb-4"
              />
            )}
            {/* Título */}
            <h3 className="text-2xl font-semibold">{noticia.titulo}</h3>
            {/* Autor */}
            <p className="text-sm text-gray-600 mt-1 font-bold">Por: {noticia.autor}</p>
            {/* Fecha */}
            <p className="text-gray-500 text-sm">
              {new Date(noticia.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* Categoría */}
            <p className="mt-2 text-gray-500 italic">
              Categoría: {noticia.categoria}
            </p>
            {/* Descripción */}
            <p className="mt-2 text-gray-700">{noticia.descripcion}</p>
            {/* Leer más */}
            <a
              href={`/noticias-y-eventos/${noticia.id}`}
              className="text-cyan-600 font-bold hover:underline mt-4 inline-block"
            >
              Leer más...
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NoticiasPage;
