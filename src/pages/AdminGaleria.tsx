import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { createImagen, deleteImagen, getImagenes } from '../services/galeriaAPI';
import { imagenType } from '../types';
import axios from 'axios'


const AdminGaleria = () => {
    const [imagenes, setImagenes] = useState<imagenType[]>([]); // Lista de URLs de imágenes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false); // Estado para mostrar que la imagen está subiendo
    const [uploadError, setUploadError] = useState<string | null>(null); // Para mostrar errores

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
    }, [imagenes]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteImagen(id);
            if (response) {
                setImagenes((prevImagenes) => prevImagenes.filter((imagen) => imagen.id !== id));
                toast.success(response.message);
            }
        } catch (err) {
            toast.error("Error al eliminar la imagen.");
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            try {
                setIsUploading(true);
                setUploadError(null);

                let originalUrl = "";
                let thumbnailUrl = "";
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Tu preset
                    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // Tu Cloud Name

                    // Subir imagen a Cloudinary
                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                        formData
                    );
                    originalUrl = response.data.secure_url; // Obtener la URL de la imagen
                    thumbnailUrl = response.data.secure_url;
                }

                // Preparar los datos finales del formulario
                const galeriaData = {
                    original: originalUrl, // Añadir la URL de la imagen
                    thumbnail: thumbnailUrl, // Añadir la URL de la imagen
                };

                const response = await createImagen(galeriaData)
                if (response) {
                    toast.success(response.message, {
                        pauseOnHover: false, // asi no se pause cuando pasas el puntero del mause
                        pauseOnFocusLoss: false
                    })
                }
            } catch (error) {
                toast.error("Error al cargar la imagen.");
                setUploadError("Error al procesar los datos. Intenta de nuevo.");
            } finally {
                setIsUploading(false);
            }
        }
    };

    if (loading) {
        return (
            <section className="container mx-auto w-[95%]">
                <h1 className="text-3xl font-bold text-gray-800">Cargando Galería</h1>
                <p className="mt-4 text-gray-600">Por favor, espera...</p>
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
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-lg shadow-xl"
        >
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Galería</h1>

            {/* Botón para agregar una nueva imagen */}
            <label className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all mt-6 inline-block cursor-pointer">
                Subir Imagen
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                />
            </label>
            {/* Mostrar estado de carga */}
            {uploadError && (
                <p className="text-red-500 text-sm">{uploadError}</p>
            )}
            {isUploading && <p className="text-gray-500">Subiendo imagen...</p>}

            {/* Vista previa de imágenes */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagenes.map((image, index) => (
                    <div key={image.id} className="relative group">
                        <img
                            src={image.original}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                        <button
                            onClick={() => handleDelete(image.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white py-0 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-black"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default AdminGaleria;