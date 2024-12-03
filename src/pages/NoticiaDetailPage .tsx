import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNoticiaById } from "../services/noticiasAPI";
import Heading from "../components/Heading";
import { noticiaType } from "../types";
import SNoticiaDetailPage from "../components/skeleton/SNoticiaDetailPage";

const NoticiaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<noticiaType>({} as noticiaType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        if (id) {
            const fetchedNoticia = await getNoticiaById(id);
            setNoticia(fetchedNoticia);
        }
      } catch (err) {
        setError("Error al cargar la noticia. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return (
      <section className="container mx-auto w-[95%]">
        <Heading heading="Cargando" span="Noticia" />
        <SNoticiaDetailPage />
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
      <Heading heading={noticia.titulo} span="Detalle" />
      <div className="mt-6">
        <p className="text-gray-500 text-sm">
          {new Date(noticia.fecha).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-700 text-lg mt-2 font-bold">{noticia.autor}</p>
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="mt-4 rounded-lg shadow-xl w-full max-h-96 object-cover"
        />
        <p className="mt-6 text-gray-700 text-base">{noticia.contenido_extenso}</p>
        {noticia.enlace_externo && (
          <a
            href={noticia.enlace_externo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 font-bold hover:underline mt-4 block"
          >
            Leer más en el enlace externo
          </a>
        )}
      </div>
    </section>
  );
};

export default NoticiaDetailPage;
