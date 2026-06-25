import { useState } from "react";

const FormularioContacto = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const onChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(datos);

    alert("Mensaje enviado");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h3 className="text-3xl font-bold text-green-800 mb-6">
        Envíanos un mensaje
      </h3>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={datos.nombre}
        onChange={onChange}
        className="w-full p-3 border rounded-xl mb-4"
      />

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={datos.email}
        onChange={onChange}
        className="w-full p-3 border rounded-xl mb-4"
      />

      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={datos.telefono}
        onChange={onChange}
        className="w-full p-3 border rounded-xl mb-4"
      />

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={datos.mensaje}
        onChange={onChange}
        rows="5"
        className="w-full p-3 border rounded-xl mb-4"
      />

      <button
        type="submit"
        className="w-full bg-green-700 text-white py-3 rounded-xl"
      >
        Enviar mensaje
      </button>
    </form>
  );
};

export default FormularioContacto;