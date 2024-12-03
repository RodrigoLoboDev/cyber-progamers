import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link, useLocation } from 'react-router-dom'

export default function NavMenu() {

  const location = useLocation()

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-cyan-600">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-auto lg:max-w-min -translate-x-[90%] lg:-translate-x-48">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 flex flex-col items-center">
            <Link className={`${location.pathname == '/' && "font-bold border-b-4 border-cyan-600"}`} to={'/'}>Inicio</Link>
            <Link className={`${location.pathname == '/servicios' && "font-bold border-b-4 border-cyan-600"}`} to={'/servicios'}>Servicios</Link>
            <Link className={`${location.pathname == '/noticias-y-eventos' && "font-bold border-b-4 border-cyan-600"}`} to={'/noticias-y-eventos'}>Noticias y Eventos</Link>
            <Link className={`${location.pathname == '/faq' && "font-bold border-b-4 border-cyan-600"}`} to={'/faq'}>FAQ</Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}