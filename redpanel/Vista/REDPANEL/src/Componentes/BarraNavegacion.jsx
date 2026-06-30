//import React from 'react';
//import { BiLogoReact } from 'react-icons/bi';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
const BarraNavegacion = () => {
    return (
        <nav className="bg-green-700 shadow-lg flex flex-col md:flex-row items-center justify-between
         py-3 fixed top-0 left-0 w-full">   
         <Link to="/">
            <span className="font-semibold text-sm sm:text-lg flex items-center gap-3 text-black">
                 <img
                        src={logo}
                        alt=" "
                        className="h-12 sm:h-14 w-auto"
                    />
                <span className="font-semibold text-2xl">
                  
                </span>
            </span>
            </Link>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-black"> 
                 <Link to="/" className="py-1 px-3 text-sm sm:text-lg font-light 
                 text-black hover:text-sky-300 rounded-2x1 hover:bg-slate-700
                    transition duration-300  
                 ">
                    Inicio
                 </Link>
                  <Link to="/Preguntas" className="py-1 px-3 text-sm sm:text-lg font-light 
                 text-black hover:text-sky-300 rounded-2x1 hover:bg-slate-700
                    transition duration-300  
                 ">
                    Preguntas Frecuentes 
                 </Link>
                  <Link to="/simulador" className="py-1 px-3 text-sm sm:text-lg font-light 
                 text-black hover:text-sky-300 rounded-2x1 hover:bg-slate-700
                    transition duration-300  
                 ">
                    Simulador de Cotizacion 
                 </Link>
                   <Link to="/Contacto" className="py-1 px-3 text-sm sm:text-lg font-light 
                 text-black hover:text-sky-300 rounded-2x1 hover:bg-slate-700
                    transition duration-300  
                 ">
                    Forma Parte de Red Panel
                 </Link>
            </div>
         </nav>
        )
        }
export default BarraNavegacion;