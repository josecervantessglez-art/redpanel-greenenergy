import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "https://xv0d1rd8-7169.usw3.devtunnels.ms/api/Empresas";

const FormularioCRUD = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    nombre: "",
    razon: "",
    rfc: "",
    correo: "",
    telefono: "",
    mision: "",
    vision: "",
    descripcion: "",
    logo: "",
    video: "",
    idmunicipio: 1,
    activa: true,
  });



  const cargarEmpresas = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    }
  };
  
useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarEmpresas();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      id: 0,
      nombre: "",
      razon: "",
      rfc: "",
      correo: "",
      telefono: "",
      mision: "",
      vision: "",
      descripcion: "",
      logo: "",
      video: "",
      idmunicipio: 1,
      activa: true,
    });

    setModoEdicion(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        await axios.put(`${API_URL}/${form.id}`, form);

        alert("Empresa actualizada correctamente");
      } else {
        await axios.post(API_URL, form);

        alert("Empresa registrada correctamente");
      }

      limpiarFormulario();
      cargarEmpresas();

    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Ocurrió un error al guardar");
    }
  };

  const editarEmpresa = (empresa) => {
    setForm(empresa);
    setModoEdicion(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const eliminarEmpresa = async (id) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar esta empresa?"
    );

    if (!confirmar) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Empresa eliminada correctamente");

      cargarEmpresas();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar empresa");
    }
  };

  return (
    <div>

      {/* FORMULARIO */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">
          {modoEdicion
            ? "Editar Empresa"
            : "Registrar Empresa"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="razon"
            placeholder="Razón Social"
            value={form.razon}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="rfc"
            placeholder="RFC"
            value={form.rfc}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="idmunicipio"
            placeholder="ID Municipio"
            value={form.idmunicipio}
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows="3"
        />

        <textarea
          name="mision"
          placeholder="Misión"
          value={form.mision}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows="2"
        />

        <textarea
          name="vision"
          placeholder="Visión"
          value={form.vision}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows="2"
        />

        <input
          type="text"
          name="logo"
          placeholder="URL Logo"
          value={form.logo}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
        />

        <input
          type="text"
          name="video"
          placeholder="URL Video"
          value={form.video}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
        />

        <label className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="activa"
            checked={form.activa}
            onChange={handleChange}
          />
          Empresa Activa
        </label>

        <div className="flex gap-3 mt-6">

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
          >
            {modoEdicion
              ? "Actualizar Empresa"
              : "Guardar Empresa"}
          </button>

          <button
            type="button"
            onClick={limpiarFormulario}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Limpiar
          </button>

        </div>
      </form>

      {/* TABLA */}

      <div className="mt-10 bg-white rounded-xl shadow-md p-6 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">
          Empresas Registradas
        </h2>

        <table className="w-full">

          <thead>
            <tr className="bg-green-700 text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {empresas.map((empresa) => (
              <tr
                key={empresa.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{empresa.id}</td>
                <td className="p-3">{empresa.nombre}</td>
                <td className="p-3">{empresa.correo}</td>
                <td className="p-3">{empresa.telefono}</td>

                <td className="p-3 text-center">

                  <button
                    onClick={() =>
                      editarEmpresa(empresa)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      eliminarEmpresa(empresa.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default FormularioCRUD;