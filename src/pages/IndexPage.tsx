import Heading from "../components/Heading";
import { motion } from "framer-motion";
import CaruselNoticias from "../components/CaruselNoticias";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaDesktop, FaGamepad, FaTv } from "react-icons/fa";
import { useEffect, useState } from "react";
import { imagenType } from "../types";
import { getImagenes } from "../services/galeriaAPI";

const servicios = [
  { title: "Gaming", icon: "game.png", items: ["Los últimos Juegos", "PCs Gamers", "Play Station 4", "Arcade"] },
  { title: "Impresión", icon: "impresion.png", items: ["Fotocopias", "Impresiones", "Anillados"] },
  { title: "Mantenimiento", icon: "reparacion.png", items: ["Reparación PC", "Mantenimiento", "Actualizaciones"] },
  { title: "Developer", icon: "desarrollo.png", items: ["Páginas Web", "Aplicaciones Web"] },
];

const IndexPage = () => {

  const [imagenes, setImagenes] = useState<imagenType[]>([]); // Lista de URLs de imágenes
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleria = async () => {
        try {
            const imagenes = await getImagenes();
            if (imagenes) {
                setImagenes(imagenes);
            }
        } catch (err) {
            setError("Error al cargar la galería. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };
    fetchGaleria();
  }, []);

  return (
    <>
      {/* Noticias */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Heading heading={"Noticias de la"} span={"Semana"} />
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <CaruselNoticias />
      </motion.section>

      {/* Sobre Nosotros */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Heading heading={"Conoce más"} span={"Sobre Nosotros"} />
        <div className="my-10 container mx-auto flex flex-col md:flex-row items-center md:items-end gap-4">
          <div className="w-full md:w-[30rem] bg-slate-100/50 p-4 rounded-md shadow-md">
            <p className="text-base">
              Somos un espacio dedicado al gaming, torneos y servicios tecnológicos en <span className=" font-black text-cyber-pink">[Saavedra 278 - Barrio Oeste]</span>. Contamos con PCs de alta gama, consolas PS4 y máquinas arcade retro. <span className="font-black text-cyber-purple">¡Vive la mejor experiencia gamer con nosotros!</span>
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[20rem] relative rounded-l-xl overflow-hidden">
            <img src="/nosotrosgaming.jpg" alt="Nosotros Gaming" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-5 md:gap-0 flex-col md:flex-row justify-around mt-10 text-center">
          <div className="text-center flex flex-col items-center">
            <FaDesktop size={40} className="text-cyan-600" />
            <p className="font-bold mt-2">PCs de Alta Gama</p>
            <p className="text-sm">Juegos con gráficos de última generación.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <FaGamepad size={40} className="text-cyan-600" />
            <p className="font-bold mt-2">Consolas PS4</p>
            <p className="text-sm">Partidas multijugador inolvidables.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <FaTv size={40} className="text-cyan-600" />
            <p className="font-bold mt-2">Arcades Retro</p>
            <p className="text-sm">Revive la nostalgia.</p>
          </div>
        </div>
      </motion.section>

      {/* Servicios */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-4"
      >
        <Heading heading={"nuestros"} span={"Servicios"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicios.map((service, index) => (
            <div key={index} className="mx-auto text-center bg-white shadow-lg rounded-lg overflow-hidden w-full">
              <div className="p-4">
                <img src={`/servicios/${service.icon}`} alt={`Icono de ${service.title}`} className="w-16 h-16 mx-auto mt-4" />
                <h3 className="font-bold text-lg md:text-xl uppercase mt-2">{service.title}</h3>
                <ul className="mt-4 space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <img src="/servicios/cheque.png" alt="Icono de cheque" className="w-6 h-6" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Galería */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Heading heading={"Nuestra"} span={"Galería"} />
        <ReactImageGallery items={imagenes} showThumbnails={true} autoPlay={true} slideInterval={3000} />
        {error && (
          <p className=" text-red-700 font-bold text-center uppercase">{error}</p>
        )}
        
      </motion.section>
    </>
  );
};

export default IndexPage;