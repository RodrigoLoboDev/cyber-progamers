import { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import { DraftContactType } from '../types';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import FormContact from './FormContact';
import { motion } from 'framer-motion';

type FormModalProps = {
    toggleSidebar: () => void
}

export default function FormModal({toggleSidebar} : FormModalProps) {

    const [modal, setModal] = useState(false);

    const cambiarState = () => setModal(!modal)


    const { register, handleSubmit, formState: { errors }, reset } = useForm<DraftContactType>();

    const onSubmit = (data: DraftContactType) => {
        // Enviar datos a través de EmailJS
        emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, data, import.meta.env.VITE_PUBLIC_KEY)
            .then((result) => {
                console.log('Correo enviado:', result.text);
                toast.success("Mensaje Enviado", {
                    pauseOnHover: false,
                    pauseOnFocusLoss: false
                });
                reset();
            })
            .catch((error) => {
                console.error('Error al enviar correo:', error.text);
                toast.error("Error al enviar el mensaje. Inténtalo de nuevo.");
            });
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <button
                onClick={() => {
                    toggleSidebar()
                    cambiarState()
                }}
                className="mt-6 w-full bg-cyber-purple text-white py-2 rounded-md flex items-center justify-center hover:bg-violet-500 transition text-xs md:text-lg"
            >
                <FaPlus className="mr-2" />
                Agregar Mensaje
            </button>

            {/* show - true o false para mostrar el modal */}
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => cambiarState()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    {/* Contenido del Modal */}
                                    <h2 className=' font-black text-cyber-pink text-center border-b uppercase text-2xl mb-2'>Formulario de Contacto</h2>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="mb-5 space-y-4"
                                        noValidate
                                    >
                                        <FormContact register={register} errors={errors} />

                                        <motion.input
                                            className="uppercase font-bold text-center py-2 bg-[#21afd2] text-white w-full rounded-lg cursor-pointer hover:bg-[#1d6475] transition-all"
                                            type="submit"
                                            value="Enviar Mensaje"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}