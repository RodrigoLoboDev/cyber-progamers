import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Nombre del ciber */}
        <p className="text-cyber-blue text-lg font-bold tracking-wide uppercase glow-text font-neon">
          Cyber ProGamers
        </p>

        {/* Redes sociales */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyber-blue transition-all"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyber-blue transition-all"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyber-pink transition-all"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Derechos reservados */}
        <p className="text-sm text-gray-500 mt-4">
          © {currentYear} Cyber ProGamers. Todos los derechos reservados.
        </p>
      </div>
    </footer>

  )
}

export default Footer