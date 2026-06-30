//import React from 'react';
import { useState } from 'react';
import Banner from '../Componentes/Banner/Banner';
import "boxicons/css/boxicons.min.css";
const accordionData = [
    { id: 1, title: "Preguntas Frecuentes", content: "Respuestas."},
     { id: 2, title: "Preguntas Frecuentes", content: "Respuestas."},
      { id: 3, title: "Preguntas Frecuentes", content: "Respuestas."},
       { id: 4, title: "Preguntas Frecuentes", content: "Respuestas."}
]

function AccordionItem({title, content, isExpanded, onToggle}) {
return (
    <div className={`bg-white rounded-3xl
    overflow-hidden transition-all duration-300 ${
    isExpanded ? "max-h-96" : "max-h-20"}`}>
    
        <div className="flex justify-between items-start p-6 cursor-pointer" onClick={onToggle}>
            <div className="text-2xl font-bold">{title}
                <i className={`bx bx-chevron-right text-4xl
            transition-all duration-300 ${isExpanded ? "rotate-90" : ""}`}></i>
            </div>
        </div>


    <div className={`px-5 pb-5 overflow-hidden transition-all duration-300
    ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <div>{content}</div>
        </div>
    </div>
)
}
const Inicio = () => {
const [expandedId, setExpandedId] = useState(null);
const toggleExpanded = (id) => (expandedId === id ? null : id)

    return (
    <>
    <Banner />
    <div className="min-h-screen flex items-center justify-center w-full
    bg-gradient-to-r from-green-400 to-blue-500">
    <div className="flex flex-col gap-3 max-w-md mx-auto">
{accordionData.map((item) => (
    <AccordionItem 
    key={item.id}
    {...item} 
    isExpanded={expandedId === item.id}
    onToggle={() => setExpandedId(toggleExpanded(item.id))}
    />
))}
    </div>
   
    </div>
</>

 )

 }
    export default Inicio;