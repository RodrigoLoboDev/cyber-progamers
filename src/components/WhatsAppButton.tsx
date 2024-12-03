import { FaWhatsapp } from 'react-icons/fa';  // Para usar el icono de WhatsApp

const WhatsAppButton = () => {
  const phoneNumber = '+5493865627955';  // Coloca tu número de WhatsApp aquí (con el código del país)
  const initialMessage = "¡Hola! Bienvenido a Ciber Gamers, ¿en qué puedo ayudarte hoy?";

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(initialMessage)}`}
      className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all z-50"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppButton;