import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='bg-gray-900 px-4 px-16  lg:px-28 py-6'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 text-white justify-items-center">
        <div>
            <h2 className='text-lg font-bold mb-4'>
                Sobre Nosotros
            </h2>
            <p className='text-gray-300'> 
            Crear la red fotovoltaica más grande de México, conectando el talento y la tecnología de 
            las mejores empresas del sector para impulsar el desarrollo sustentable y proveer 
            soluciones energéticas que muevan al país.
            </p>
            <p className='text-gray-300'> 
            Consolidarnos como la red fotovoltaica con mayor impacto en América Latina, logrando que
             la unión de las empresas mexicanas acelere la adopción de energía limpia y posicione a
            México como un referente global en desarrollo sustentable.
            </p>
        </div>
        <div>
             <h2 className='text-lg font-bold mb-4 text-white text-white'> Sobre Nosotros </h2>
             <ul>
                <li><Link to="/" className="hover:underline text-gray-300">Inicio</Link></li>
                <li><Link to="/Simulador" className="hover:underline text-gray-300">Simulador de ahorro</Link></li>
                <li><Link to="/Preguntas" className="hover:underline text-gray-300">Preguntas frecuentes</Link></li>
                <li><Link to="/Contacto" className="hover:underline text-gray-300">Contacto</Link></li>
             </ul>  
        </div>
        <div>
            <h2 className='text-lg font-bold mb-4 text-white'> Redes Sociales </h2>
            <ul className="flex space-x-4">
                        <li> 
                            {""}
                            <FaFacebookF className="text-blue-500"/>{""}
                             <a href="https://www.facebook.com/Greenenergylmx" className="hover:underline text-gray-300">
                                Facebook
                            </a>
                        </li>
                       
            </ul>  
        </div>
        </div>
        <div className=" border-t border-gray-600 pt-6 text-gray-300 text-center mt-4">
                <p> @2026 Green energy. Todos los derechos reservados</p>
        </div>
    </footer>
  )
}

export default Footer