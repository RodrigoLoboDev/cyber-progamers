import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SwiperCore from 'swiper';
import { noticiaType } from '../types';
import { getNoticias } from '../services/noticiasAPI';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// import 'swiper/css/navigation'; // Estilos para el módulo de navegación
import SCaruselNoticias from './skeleton/SCaruselNoticias';


const CaruselNoticias = () => {
    const [noticias, setNoticias] = useState<noticiaType[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGetNoticias = async () => {
            try {
                const noticias = await getNoticias()
                if (noticias) {
                    setNoticias(noticias)
                }
            } catch (error) {
                setError("Error al cargar la noticia. Inténtalo nuevamente.");
            } finally {
                setLoading(false)
            }
        }
        fetchGetNoticias()
    }, [])


    // Referencias para los botones personalizados
    const swiperRef = useRef<SwiperCore | null>(null); // SwiperCore tipado para TypeScript

    // Mostrar el skeleton mientras se está cargando
    if (loading) {
        return (
            <section className="container mx-auto w-[95%]">
                <SCaruselNoticias />
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

        <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            onSwiper={(swiper) => { swiperRef.current = swiper }} // Asignamos el Swiper a la ref
            loop={noticias.length > 2}
            breakpoints={{
                // Cuando la pantalla es >= 640px (dispositivos pequeños)
                640: {
                    slidesPerView: 2, // Muestra 1 card
                    spaceBetween: 10,
                },
                // Cuando la pantalla es >= 768px (tablets)
                768: {
                    slidesPerView: 2, // Muestra 2 cards
                    spaceBetween: 20,
                },
                // Cuando la pantalla es >= 1024px (laptops y desktops)
                1024: {
                    slidesPerView: 3, // Muestra 3 cards
                    spaceBetween: 30,
                }
            }}
        >
            {noticias.length > 0 ? noticias.map((noticia, index) => (
                <SwiperSlide key={index}>
                    <motion.div
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
                            {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
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
                </SwiperSlide>
            )) : (
                <p className=' dark:text-white'>No hay datos disponibles en este momento.</p>
            )}
        </Swiper>
    )
}

export default CaruselNoticias