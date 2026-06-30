//import React from 'react';
import Banner from '../Componentes/Banner/Banner';
import FormularioContacto from '../Componentes/Contacto/FormularioContacto';
import InformacionContacto from '../Componentes/Contacto/InformacionContacto';
 const Inicio = () => {
return (
    <>
    <Banner />
    <div className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-center mb-12">
            Contacto
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InformacionContacto />
            <FormularioContacto />
          </div>

        </div>
      </div>
</>
 )

 }
    export default Inicio;