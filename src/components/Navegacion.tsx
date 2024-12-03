import { Link, useLocation } from "react-router-dom";

const Navegacion = () => {
  const location = useLocation();

  return (
    <nav className="md:flex items-center gap-4 text-cyber-blue font-black text-xl uppercase hidden">
      {/* Inicio */}
      <Link
        className={`relative hover:text-white tracking-wider transition-all ${
          location.pathname === "/" && "font-bold text-cyan-400"
        }`}
        to={"/"}
      >
        Inicio
        {location.pathname === "/" && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-all"></span>
        )}
      </Link>

      {/* Servicios */}
      <Link
        className={`relative hover:text-white tracking-wider transition-all ${
          location.pathname === "/servicios" && "font-bold text-cyan-400"
        }`}
        to={"/servicios"}
      >
        Servicios
        {location.pathname === "/servicios" && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-all"></span>
        )}
      </Link>

      {/* Noticias y Eventos */}
      <Link
        className={`relative hover:text-white tracking-wider transition-all ${
          location.pathname === "/noticias-y-eventos" && "font-bold text-cyan-400"
        }`}
        to={"/noticias-y-eventos"}
      >
        Noticias y Eventos
        {location.pathname === "/noticias-y-eventos" && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-all"></span>
        )}
      </Link>

      {/* FAQ */}
      <Link
        className={`relative hover:text-white tracking-wider transition-all ${
          location.pathname === "/faq" && "font-bold text-cyan-400"
        }`}
        to={"/faq"}
      >
        FAQ
        {location.pathname === "/faq" && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-all"></span>
        )}
      </Link>

      {/* MenuDropdown */}
      {/* <MenuDropdown /> */}
    </nav>
  );
};

export default Navegacion;
