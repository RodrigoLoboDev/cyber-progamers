import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Heading from "../components/Heading"; // Suponiendo que estás usando el componente Heading.

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cuáles son los horarios del ciber?",
      answer:
        "Nuestro ciber está abierto todos los días de 8:00 a 14:00 y de 17:00 a 00:00. También podemos quedarnos hasta tarde si hay muchos que vienen a jugar. ¡No dudes en consultarnos!",
    },
    {
      question: "¿Ofrecen impresiones y fotocopias?",
      answer:
        "Sí, ofrecemos servicios de impresión, fotocopias y escaneo a precios accesibles. Pregunta en el mostrador para más detalles.",
    },
    {
      question: "¿Cómo puedo inscribirme en los torneos?",
      answer:
        "Puedes inscribirte en los torneos directamente desde nuestra app o preguntando en el mostrador del ciber.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos efectivo, transferencias bancarias y pagos con QR.",
    },
    {
      question: "¿Tienen promociones especiales?",
      answer:
        "Sí, ofrecemos descuentos en tiempo de uso para clientes frecuentes. ¡Pregunta por nuestras tarjetas de fidelidad!",
    },
  ];
  

  const toggleFAQ = (index : number | null) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="container mx-auto w-[95%]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Heading heading="Preguntas Frecuentes" span="(FAQ)" />
      </motion.div>

      <motion.div
        className="mt-6 space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border rounded-lg shadow-lg bg-white p-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center space-x-2">
                <FaQuestionCircle className="text-blue-500 text-xl" />
                <h3 className="text-lg font-semibold">{faq.question}</h3>
              </div>
              {activeIndex === index ? (
                <FaChevronUp className="text-blue-500 text-xl" />
              ) : (
                <FaChevronDown className="text-blue-500 text-xl" />
              )}
            </div>
            {activeIndex === index && (
              <motion.p
                className="mt-2 text-gray-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQPage;
