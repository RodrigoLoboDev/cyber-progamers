import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { DraftFormNoticiaType } from '../types';
import FormNoticia from '../components/FormNoticia';
import { useState } from 'react';
import axios from 'axios'
import { createNoticia } from '../services/noticiasAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const NuevaNoticiaPage = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<DraftFormNoticiaType>();
    const [isUploading, setIsUploading] = useState(false); // Estado para mostrar que la imagen está subiendo
    const [uploadError, setUploadError] = useState<string | null>(null); // Para mostrar errores
    const navigate = useNavigate()

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
                formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Tu preset
                formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // Tu Cloud Name

                // Subir imagen a Cloudinary
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                    formData
                );
                imageUrl = response.data.secure_url; // Obtener la URL de la imagen
            }

            // Preparar los datos finales del formulario
            const noticiaData = {
                ...data,
                imagen: imageUrl, // Añadir la URL de la imagen
            };            

            const response = await createNoticia(noticiaData)
            if (response) {
                toast.success(response.message, {
                    pauseOnHover: false, // asi no se pause cuando pasas el puntero del mause
                    pauseOnFocusLoss: false
                })
                navigate('/admin/noticias')
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
            <h1 className="text-3xl font-bold text-gray-800">Agregar Nueva Noticia</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
                noValidate
            >
                <FormNoticia register={register} errors={errors} uploadError={uploadError} isUploading={isUploading} />

                {/* Botón para guardar noticia */}
                <motion.input
                    className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all mt-4 cursor-pointer"
                    type="submit"
                    value="Guardar Noticia"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
            </form>
        </motion.div>
    );
};

export default NuevaNoticiaPage;
