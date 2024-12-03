import { Link, Outlet } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
// La hoja de stylos css
import "react-toastify/dist/ReactToastify.css"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import Footer from "../components/Footer"
import Navegacion from "../components/Navegacion"
import WhatsAppButton from "../components/WhatsAppButton"
import { MapPinIcon } from '@heroicons/react/24/solid'
import Sidebar from "../components/Sidebar"

export default function CyberLayout() {

  function handleRedirect() {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>¿Quieres abrir Google Maps para ver la ubicación?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                window.open("https://maps.app.goo.gl/FVE8aBHUJf6fbhdo8", "_blank");
                closeToast();
              }}
              className="bg-cyan-600 text-white py-1 w-full rounded hover:bg-cyan-800 transition-all"
            >
              Sí
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-400 text-white py-1 w-full rounded hover:bg-gray-600 transition-all"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false, // Para que no se cierre automáticamente
        closeOnClick: false,
        draggable: false
      }
    );
  }

  return (
    <>
      <header className="bg-cyber-app bg-cover bg-no-repeat bg-top md:h-[27rem] h-[25rem] relative">
        {/* capa oscura */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/100 to-transparent"></div>

        <div className=" absolute left-0 right-0 bottom-0 top-0 ">
          <div className=" container mx-auto w-[95%] md:h-[30rem]">

            {/* BARRA */}
            <div className=" flex justify-center md:justify-between items-center mt-10">
              <Link
                className=" w-72"
                to={'/'}
              >
                <Logo />
              </Link>

              <Navegacion />
            </div>

            {/* TEXTO */}
            <div className=" space-y-4 flex flex-col items-center mt-10">
              <p className=" text-gray-400 text-2xl md:text-3xl lg:text-4xl font-bold md:w-[40rem] uppercase md:leading-[3rem] text-center ">
                Donde la
                <span className=" block text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-wide neon-text">tecnología</span> encuentra la <span className=" text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-wide neon-text">diversión</span>
              </p>

              <button
                type="button"
                className=" bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2"
                onClick={handleRedirect}
              >
                <MapPinIcon className=" w-7 h-7" />
                <p>¿Cómo LLegar?</p>
              </button>
            </div>
          </div>
        </div>
        <div className=" absolute right-5 top-5 md:hidden transform transition-transform ">
          <NavMenu />
        </div>
      </header>

      <Sidebar />

      <main className=" container mx-auto my-5 p-5 w-[95%]">

        <Outlet />

      </main>
      <Footer />
      <ToastContainer />
      <WhatsAppButton />
    </>
  )
}