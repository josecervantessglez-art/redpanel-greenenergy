import BarraNavegacion from "./Componentes/BarraNavegacion";
import {Routes, Route} from 'react-router';
import Inicio from "./routes/inicio";
import Simulador from "./routes/simulador";
import Contacto from "./routes/contacto";
import Preguntas from "./routes/preguntas";
import Footer from "./Componentes/Footer";
import Administrador from "./routes/Administrador";

function App() {

  return (
    
     <div className="min-h-screen flex flex-col bg-green-100">
      <BarraNavegacion />
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Simulador" element={<Simulador />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Preguntas" element={<Preguntas />} />
        <Route path="/Administrador" element={<Administrador/>}/>
      </Routes>
      <Footer />
        </main>
        
     </div>
    
  );
}

export default App;
