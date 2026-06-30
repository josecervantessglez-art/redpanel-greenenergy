import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
} from "react-icons/fa";

const InformacionContacto = () => {
  return (
    <>
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        Hablemos de tu proyecto
      </h2>

      <p className="text-gray-700 mb-8">
        Estamos conectando clientes con proveedores de paneles solares
        en todo México.
      </p>

      <div className="flex items-center gap-4 mb-5">
        <FaEnvelope className="text-green-700 text-xl" />
        <div>
          <strong>Correo</strong>
          <p>contacto@redpanel.com</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <FaPhoneAlt className="text-green-700 text-xl" />
        <div>
            <a href="tel:+528711234567" className="flex items-center gap-4 hover:text-green-700">
                    <div>
                        <strong>Teléfono</strong>
                        <p>871 123 4567</p>
                    </div>
            </a>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <FaFacebookF className="text-blue-600 text-xl" />
        <div>
          <strong>Facebook</strong>
          <p></p>
          <a
            href="https://www.facebook.com/Greenenergylmx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Green Energy Laguna
          </a  >
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FaMapMarkerAlt className="text-red-600 text-xl" />
        <div>
          <a href="https://www.google.com/maps/search/?api=1&query=Torreon+Coahuila"
          target="_blank"
           rel="noopener noreferrer"
            className="flex items-center gap-4 hover:text-green-700">
     <div>
    <strong>Ubicación</strong>
    <p>Torreón, Coahuila</p>
  </div>
</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default InformacionContacto;