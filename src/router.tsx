import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './AnimatedRoutes'

// Creamos nuestro router y las rutas
const RouterApp = () => {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    )
}

export default RouterApp