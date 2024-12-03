import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DraftContactType } from "../types";
import ErrorMessage from "./ErrorMessage";

type FormContactProps = {
    register: UseFormRegister<DraftContactType>
    errors: FieldErrors<DraftContactType>
}

const FormContact = ({register, errors} : FormContactProps) => {

    return (
        <>
            <div className=" space-y-2 flex items-center">
                <label htmlFor="asunto" className="text-sm uppercase font-bold w-1/6">
                    Asunto:
                </label>
                <input
                    id="asunto"
                    className=" p-2 border border-gray-200 rounded-md w-5/6"
                    type="text"
                    placeholder="Asunto"
                    {...register("asunto", {
                        required: "El Asunto es Obligatorio",
                    })}
                />

                {errors.asunto && (
                    <ErrorMessage>{errors.asunto.message}</ErrorMessage>
                )}
            </div>

            <div className=" space-y-2 flex items-center">
                <label htmlFor="email" className="text-sm uppercase font-bold w-1/6">
                    Email:
                </label>
                <input
                    id="email"
                    className="w-5/6 p-2  border border-gray-200 rounded-md"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "El Email es Obligatorio",
                    })}
                />

                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>

            <div className=" space-y-2 flex items-center">
                <label htmlFor="nombre" className="text-sm uppercase font-bold w-1/6">
                    Nombre:
                </label>
                <input
                    id="nombre"
                    className="w-5/6 p-2  border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre", {
                        required: "El Nombre es Obligatorio",
                    })}
                />

                {errors.nombre && (
                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                )}
            </div>

            <div className=" space-y-2 flex items-center">
                <label htmlFor="apellido" className="text-sm uppercase font-bold w-1/6">
                    Apellido:
                </label>
                <input
                    id="apellido"
                    className="w-5/6 p-2  border border-gray-200 rounded-md"
                    type="text"
                    placeholder="Apellido"
                    {...register("apellido", {
                        required: "El Apellido es Obligatorio",
                    })}
                />

                {errors.apellido && (
                    <ErrorMessage>{errors.apellido.message}</ErrorMessage>
                )}
            </div>

            <div className=" space-y-2 flex items-center">
                <label htmlFor="celular" className="text-sm uppercase font-bold w-1/6">
                    Celular:
                </label>
                <input
                    id="celular"
                    className="w-5/6 p-2  border border-gray-200 rounded-md"
                    type="tel"
                    placeholder="Celular"
                    {...register("celular", {
                        required: "El Celular es Obligatorio",
                    })}
                />

                {errors.celular && (
                    <ErrorMessage>{errors.celular.message}</ErrorMessage>
                )}
            </div>

            <div className=" space-y-2 flex items-center">
                <label htmlFor="mensaje" className="text-sm uppercase font-bold w-1/6">
                    Mensaje:
                </label>
                <textarea 
                    className="w-5/6 p-2  border border-gray-200 rounded-md"
                    id="mensaje" 
                    placeholder="Tu Mensaje"
                    {...register("mensaje", {
                        required: "El mensaje del Mensaje es Obligatorio",
                    })}
                />

                {errors.mensaje && (
                    <ErrorMessage>{errors.mensaje.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}

export default FormContact