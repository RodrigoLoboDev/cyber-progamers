import Heading from "../components/Heading";
import Heading2 from "../components/Heading2";
import { FaPrint, FaImage, FaCertificate, FaClipboard, FaFileAlt, FaEnvelopeOpenText, FaLaptop, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';


const services = [
  {
    icon: FaPrint,
    title: "Copias en Blanco y Negro:",
    description: "Disponibles en formatos A4 y Oficio, perfectas para documentos e informes."
  },
  {
    icon: FaImage,
    title: "Impresiones en Blanco y Negro y Color:",
    description: "Asegura la mejor calidad y viveza para todos tus documentos, ya sea en A4 o Oficio."
  },
  {
    icon: FaEnvelopeOpenText,
    title: "Impresiones de Fotos:",
    description: "Captura tus momentos especiales con impresiones fotográficas de alta calidad."
  },
  {
    icon: FaCertificate,
    title: "Diplomas y Láminas en A3 y A3+:",
    description: "Ideal para certificaciones, presentaciones y proyectos que requieren un formato más grande."
  },
  {
    icon: FaClipboard,
    title: "Todo para el Docente:",
    description: "Facilitamos tu labor con impresiones de formularios de licencia, códigos de SESOP, inscripciones y re-inscripciones a junta."
  },
  {
    icon: FaFileAlt,
    title: "Consultas de ANSES:",
    description: "Imprime tus documentos importantes como el CUIL, certificaciones negativas y más."
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const ServiciosPage = () => {
  return (
    <motion.section
      className='container mx-auto w-[95%]'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading heading={'Nuestros'} span={'Servicios'} />
      <p className='text-xl md:text-2xl'>
        En <span className='font-bold text-cyber-pink'>CIBER PROGAMERS</span>, ofrecemos una amplia gama de servicios para satisfacer tus necesidades tecnológicas y creativas. Desde <span className='font-bold'>impresiones de alta calidad</span>, <span className='font-bold'>reparación de computadoras</span>, hasta la <span className='font-bold'>creación de sitios web profesionales</span>. Contamos con tecnología de punta y un equipo preparado para brindarte el mejor servicio.
      </p>

      {/* IMPRESION */}
      <Heading2 heading={"Nuestros Servicios de Impresión Incluyen:"} />

      <motion.ul
        className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.li
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center gap-4 text-center border border-slate-200 hover:shadow-2xl transition transform hover:-translate-y-2"
            variants={itemVariants}
          >
            {/* Icono del servicio */}
            <service.icon className="text-cyan-600 w-12 h-12" />

            {/* Título y descripción */}
            <div>
              <h3 className="font-bold text-lg uppercase text-cyan-800">{service.title}</h3>
              <p className="text-slate-600 text-sm">{service.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>


      {/* ENVIO DE ARCHIVOS */}
      <div className='flex flex-col items-center justify-center gap-12 md:gap-12 bg-gradient-to-r from-cyber-pink to-cyber-purple text-white py-12 px-6 rounded-lg shadow-lg'>
        <Heading2 heading={'¡Imprimir Nunca Fue Tan Fácil!'} />
        <p className='text-lg md:text-xl text-center'>
          Con <span className='font-bold'>CIBER PROGAMERS</span>, enviar tus documentos para impresión es rápido y sencillo.
          Sigue estos <span className='font-bold'>tres pasos</span> y nosotros nos encargamos del resto.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          {/* Paso 1 */}
          <motion.div
            className='flex flex-col items-center gap-4 p-4 bg-white text-black rounded-lg shadow-lg'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaFileAlt className='text-5xl text-cyber-purple' />
            <h3 className='font-bold text-lg'>1. Envía tus Archivos</h3>
            <p>Sube tus documentos directamente a nuestro sistema o envíalos a través de WhatsApp.</p>
          </motion.div>

          {/* Paso 2 */}
          <motion.div
            className='flex flex-col items-center gap-4 p-4 bg-white text-black rounded-lg shadow-lg'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaClipboard className='text-5xl text-cyber-purple' />
            <h3 className='font-bold text-lg'>2. Confirmación</h3>
            <p>Recibe una confirmación rápida con el costo y las opciones de pago.</p>
          </motion.div>

          {/* Paso 3 */}
          <motion.div
            className='flex flex-col items-center gap-4 p-4 bg-white text-black rounded-lg shadow-lg'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaPrint className='text-5xl text-cyber-purple' />
            <h3 className='font-bold text-lg'>3. Recoge tus Impresiones</h3>
            <p>Te avisaremos cuando tus impresiones estén listas para recoger.</p>
          </motion.div>
        </div>

        <div className='mt-8'>
          <a
            href="https://wa.me/+5493865627955"
            className='px-6 py-3 bg-white text-cyan-600 font-bold rounded-lg shadow-lg hover:bg-gray-200'
            target="_blank"
            rel="noopener noreferrer"
          >
            ¡Envíanos tus Archivos Ahora!
          </a>
        </div>
      </div>


      {/* Reparación de Computadoras */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 md:p-12 rounded-lg shadow-lg"
      >
        <Heading2 heading="Reparación de Computadoras" />

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          {/* Icono grande con color llamativo */}
          <FaLaptop className="text-6xl text-white bg-blue-600 p-4 rounded-full shadow-lg" />

          {/* Descripción y detalles */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl mb-4">
              Tu computadora es una herramienta esencial. Nuestro equipo ofrece <span className="font-bold">diagnóstico experto</span> y <span className="font-bold">reparación eficiente</span> para portátiles y equipos de escritorio.
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
              <li>Mantenimiento de software y eliminación de virus.</li>
              <li>Actualización y reparación de hardware.</li>
              <li>Recuperación de datos y optimización de rendimiento.</li>
            </ul>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="mt-6 text-center">
          <a
            href="https://wa.me/+5493865627955"
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Solicitar Diagnóstico
          </a>
        </div>
      </motion.div>


      {/* Creación de Páginas Web */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 md:p-12 rounded-lg shadow-lg"
      >
        <Heading2 heading="Creación de Páginas Web" />

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          {/* Icono destacado */}
          <FaCode className="text-6xl text-white bg-green-600 p-4 rounded-full shadow-lg" />

          {/* Descripción y beneficios */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl mb-4">
              Lleva tu negocio al siguiente nivel con una <span className="font-bold">página web profesional</span> diseñada a medida para destacar en el mundo digital.
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
              <li>Diseño moderno y responsive para todos los dispositivos.</li>
              <li>Optimización para motores de búsqueda (SEO).</li>
              <li>Integración de funcionalidades personalizadas según tus necesidades.</li>
            </ul>
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="mt-6 text-center">
          <a
            href="https://portafolio-rodrigo-lobo-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Ver Nuestro Portafolio
          </a>
        </div>
      </motion.div>

    </motion.section>
  );
};

export default ServiciosPage;