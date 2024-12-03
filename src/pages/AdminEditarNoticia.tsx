import { motion } from 'framer-motion';
import { DraftFormNoticiaType } from '../types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { editNoticia, getNoticiaById } from '../services/noticiasAPI';
import FormNoticia from '../components/FormNoticia';
import { useNavigate, useParams } from 'react-router-dom';


const AdminEditarNoticia = () => {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DraftFormNoticiaType>();
    const [isUploading, setIsUploading] = useState(false); // Estado para mostrar que la imagen está subiendo
    const [uploadError, setUploadError] = useState<string | null>(null); // Para mostrar errores
    const { id } = useParams()
    const [imagen, setImagen] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const fetchEditNoticia = async () => {
            try {
                if (id) {
                    const noticia = await getNoticiaById(id)
                    setValue('titulo', noticia.titulo)
                    setValue('autor', noticia.autor)
                    setValue('categoria', noticia.categoria)
                    setValue('descripcion', noticia.descripcion)
                    setValue('contenido_extenso', noticia.contenido_extenso)
                    setValue('enlace_externo', noticia.enlace_externo)
                    setValue('fecha', noticia.fecha)
                    setImagen(noticia.imagen)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchEditNoticia()
    }, [])


    const onSubmit = async (data: DraftFormNoticiaType) => {
        try {
            setIsUploading(true);
            setUploadError(null);

            // Extraer el archivo de la imagen
            const file = watch("imagen")?.[0]; // Obtener archivo seleccionado

            let imageUrl = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "qr2slf4f"); // Tu preset
                formData.append("cloud_name", "djibjrrxy"); // Tu Cloud Name

                // Subir imagen a Cloudinary
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/djibjrrxy/image/upload",
                    formData
                );
                imageUrl = response.data.secure_url; // Obtener la URL de la imagen
            }

            // Preparar los datos finales del formulario
            const noticiaData = {
                ...data,
                imagen: imageUrl, // Añadir la URL de la imagen
            };

            if (id) {
                const response = await editNoticia(id, noticiaData)
                if (response) {
                    toast.success(response.message, {
                        pauseOnHover: false, // asi no se pause cuando pasas el puntero del mause
                        pauseOnFocusLoss: false
                    })
                    navigate('/admin/noticias')
                }
            }
        } catch (error) {
            console.error("Error al subir la imagen o guardar los datos:", error);
            setUploadError("Error al procesar los datos. Intenta de nuevo.");
        } finally {
            setIsUploading(false);
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
            <h1 className="text-3xl font-bold text-gray-800">Editar Noticia</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
                noValidate
            >
                <FormNoticia register={register} errors={errors} uploadError={uploadError} isUploading={isUploading} />

                {/* Mostrar una imagen previa si existe */}
                {imagen && (
                    <img
                        className=' h-40'
                        src={imagen}
                        alt="imagen noticia"
                    />
                )}

                {/* Botón para guardar noticia */}
                <motion.input
                    className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all mt-4 cursor-pointer"
                    type="submit"
                    value="Guardar Cambios"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
            </form>
        </motion.div>
    )
}

export default AdminEditarNoticia