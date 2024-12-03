import { useState } from 'react';
import { FaChevronRight, FaChevronLeft, FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FormModal from './FormModal';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Botón lateral flotante */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 p-3 bg-gradient-to-r from-cyber-pink to-red-500 text-white rounded-r-full shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {isOpen ? <FaChevronLeft className=' w-4 h-4 md:w-6 md:h-6' /> : <FaChevronRight className=' w-4 h-4 md:w-6 md:h-6' />}
      </button>

      {/* Sidebar animado */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-gray-900 text-gray-400 w-44 p-2 md:w-64 md:p-4 shadow-lg z-40 flex flex-col justify-between"
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        {/* CONTACTO */}
        <div>
          {/* Título */}
          <h2 className="md:text-lg text-cyber-blue font-bold uppercase my-2 md:my-4">Contacto</h2>

          {/* Información de contacto */}
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-cyber-blue mr-1 md:mr-3" />
              <span className=' text-xs md:text-base'>Saavedra 278, Bº Oeste<br />Juan B. Alberdi, Tucumán</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-cyber-blue mr-1 md:mr-3" />
              <span className=' text-xs md:text-base'>correotaller278@gmail.com</span>
            </li>
            <li className="flex items-center">
              <FaPhone className="text-cyber-blue mr-1 md:mr-3" />
              <a href="tel:3865627955" className="hover:text-white transition text-xs md:text-base">
                3865 - 627955
              </a>
            </li>
            <li className="flex items-center">
              <FaFacebook className="text-cyber-blue mr-1 md:mr-3" />
              <a
                href="https://www.facebook.com/profile.php?id=61557333985949"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition text-xs md:text-base"
              >
                Ciber ProGamers
              </a>
            </li>
          </ul>
        </div>

        {/* HORARIOS y FORMULARIO */}
        <div>
          {/* Horarios */}
          <h3 className="font-bold text-gray-300 mb-2">Horarios</h3>
          <ul className="text-sm space-y-2">
            <li className=' text-xs md:text-base'>Lunes a Viernes: 09:00 - 13:00 | 17:00 - 00:00</li>
            <li className=' text-xs md:text-base'>Sábado: 08:00 - 22:00</li>
            <li className=' text-xs md:text-base'>Domingo: 11:00 - 22:00</li>
          </ul>
          {/* Formulario de Contacto */}
          <FormModal toggleSidebar={toggleSidebar} />
        </div>

      </motion.div>
    </div>
  );
};

export default Sidebar;
