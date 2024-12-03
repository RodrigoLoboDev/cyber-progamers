import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DraftFormNoticiaType } from "../types"
import ErrorMessage from "./ErrorMessage";

type FormNoticiaProps = {
    register: UseFormRegister<DraftFormNoticiaType>
    errors: FieldErrors<DraftFormNoticiaType>
    uploadError: string | null
    isUploading: boolean
}

const FormNoticia = ({ register, errors, uploadError, isUploading }: FormNoticiaProps) => {

    return (
        <>
            {/* Título */}
            <div>
                <label className="block text-gray-700" form="titulo">Título</label>
                <input
                    id="titulo"
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    placeholder="Titulo"
                    {...register("titulo", {
                        required: "El Titulo es Obligatorio",
                    })}
                />
                {errors.titulo && (
                    <ErrorMessage>{errors.titulo.message}</ErrorMessage>
                )}
            </div>

            {/* Autor */}
            <div>
                <label className="block text-gray-700" form="autor">Autor</label>
                <input
                    id="autor"
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    placeholder="Autor"
                    value={'Cyber ProGamers'}
                    {...register("autor", {
                        required: "El Autor es Obligatorio",
                    })}
                />
                {errors.autor && (
                    <ErrorMessage>{errors.autor.message}</ErrorMessage>
                )}
            </div>

            {/* Categoría */}
            <div>
                <label className="block text-gray-700" form="categoria">Categoría</label>
                <select
                    id="categoria"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    {...register("categoria", {
                        required: "La Categoria es Obligatoria",
                    })}
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="torneo">Torneo</option>
                    <option value="noticia">Noticia</option>
                    {/* Agregar más opciones según tus necesidades */}
                </select>
                {errors.categoria && (
                    <ErrorMessage>{errors.categoria.message}</ErrorMessage>
                )}
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-gray-700" form="descripcion">Descripción</label>
                <input
                    id="descripcion"
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    {...register("descripcion", {
                        required: "La Descripcion es Obligatoria",
                    })}
                />
                {errors.descripcion && (
                    <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
                )}
            </div>

            {/* Contenido Extenso */}
            <div>
                <label className="block text-gray-700" form="contenido_extenso">Contenido Extenso</label>
                <textarea
                    id="contenido_extenso"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    rows={6}
                    {...register("contenido_extenso", {
                        required: "El Contenido Extenso es Obligatorio",
                    })}
                />
                {errors.contenido_extenso && (
                    <ErrorMessage>{errors.contenido_extenso.message}</ErrorMessage>
                )}
            </div>

            {/* Enlace Externo */}
            <div>
                <label className="block text-gray-700" form="enlace_externo">Enlace Externo</label>
                <input
                    id="enlace_externo"
                    type="url"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    {...register("enlace_externo")}
                />
            </div>

            {/* Fecha */}
            <div>
                <label className="block text-gray-700" form="fecha">Fecha</label>
                <input
                    id="fecha"
                    type="date"
                    className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md"
                    {...register("fecha", {
                        required: "La Fecha es Obligatoria",
                    })}
                />
                {errors.fecha && (
                    <ErrorMessage>{errors.fecha.message}</ErrorMessage>
                )}
            </div>

            {/* Imagen */}
            <div>
                <label className="block text-gray-700" form="imagen">Imagen</label>
                <input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    className="w-full mt-2"
                    {...register("imagen", {
                        required: "La Imagen es Obligatoria",
                    })}
                />
                {errors.imagen && (
                    <ErrorMessage>{errors.imagen.message}</ErrorMessage>
                )}
                {/* Mostrar estado de carga */}
                {uploadError && (
                    <p className="text-red-500 text-sm">{uploadError}</p>
                )}
                {isUploading && <p className="text-gray-500">Subiendo imagen...</p>}
            </div>
        </>
    )
}

export default FormNoticia