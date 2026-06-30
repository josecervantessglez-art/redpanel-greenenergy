//import React from 'react';
import FormularioCRUD from '../Componentes/FormularioCRUD'

 const Administrador = () => {
return (
    <>
    <div className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-center mb-12">
         Administrador
          </h1>

          <div className=" gap-8">
          <FormularioCRUD />
          </div>

        </div>
      </div>
</>
 )

 }
    export default Administrador;