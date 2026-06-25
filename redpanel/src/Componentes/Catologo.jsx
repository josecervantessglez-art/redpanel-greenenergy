import { useEffect, useState } from "react";
import axios from "axios";

const Catalogo = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [municipioSeleccionado, setMunicipioSeleccionado] =
    useState("");

  useEffect(() => {
    const obtenerEmpresas = async () => {
      try {
        const response = await axios.get(
          "https://xv0d1rd8-7169.usw3.devtunnels.ms/api/Empresas"
        );

        setEmpresas(response.data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las empresas.");
      } finally {
        setLoading(false);
      }
    };

    obtenerEmpresas();
  }, []);

  const empresasFiltradas = municipioSeleccionado
    ? empresas.filter(
        (empresa) =>
          empresa.idmunicipio === Number(municipioSeleccionado)
      )
    : empresas;

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">
          Cargando empresas...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <section className="bg-green-100 py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-4">
          Catálogo de Proveedores
        </h2>

        <p className="text-center text-gray-700 mb-10">
          Encuentra empresas especializadas en energía solar.
        </p>

        {/* FILTRO MUNICIPIO */}

        <div className="flex justify-center mb-10">
          <select
            value={municipioSeleccionado}
            onChange={(e) =>
              setMunicipioSeleccionado(e.target.value)
            }
            className="w-full max-w-md p-3 border rounded-lg shadow-sm"
          >
            <option value="">
              Todos los municipios
            </option>

            <option value="1">
              Torreón
            </option>

            <option value="2">
              Gómez Palacio
            </option>

            <option value="3">
              Lerdo
            </option>

            <option value="4">
              Matamoros
            </option>
          </select>
        </div>

        {/* TARJETAS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {empresasFiltradas.map((empresa) => (
            <div
              key={empresa.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={
                  empresa.logo ||
                  "https://via.placeholder.com/400x250?text=Red+Panel"
                }
                alt={empresa.nombre}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">
                  {empresa.nombre}
                </h3>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">
                    Teléfono:
                  </span>{" "}
                  {empresa.telefono}
                </p>

                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">
                    Correo:
                  </span>{" "}
                  {empresa.correo}
                </p>

                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">
                    Descripción:
                  </span>{" "}
                  {empresa.descripcion}
                </p>

                <button className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition">
                  Contactar Proveedor
                </button>
              </div>
            </div>
          ))}
        </div>

        {empresasFiltradas.length === 0 && (
          <div className="text-center mt-10">
            <h3 className="text-xl text-gray-600">
              No hay empresas registradas para este municipio.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalogo;