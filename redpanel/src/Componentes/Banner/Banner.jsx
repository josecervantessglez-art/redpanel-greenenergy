import { useState, useEffect } from "react";
import "./Banner.css";

const slides = [
  {
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_-_1_MW.jpg",
    titulo: "NET PANEL",
    texto:
      "La energía más limpia del mundo también es la más barata. Instala paneles solares, deja de depender de la CFE, paga menos cada mes y contribuye a un medio ambiente más sano. Porque cuidar el planeta y cuidar tu dinero no son cosas distintas.",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    titulo: "Nuestra Misión",
    texto:
      "Crear la red fotovoltaica más grande de México, conectando el talento y la tecnología de las mejores empresas del sector para impulsar el desarrollo sustentable y proveer soluciones energéticas que muevan al país..",
  },
  {
    imagen:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    titulo: "Visión",
    texto:
      "Consolidarnos como la red fotovoltaica con mayor impacto en América Latina, logrando que la unión de las empresas mexicanas acelere la adopción de energía limpia y posicione a México como un referente global en desarrollo sustentable..",
  },
];

const Banner = () => {
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 13000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
          ),
          url(${slides[slideActual].imagen})
        `,
      }}
    >
      <div className="banner-container">
        <h1>{slides[slideActual].titulo}</h1>

        <p>{slides[slideActual].texto}</p>
      </div>
    </div>
  );
};

export default Banner;