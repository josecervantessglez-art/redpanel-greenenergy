import { useState } from "react";

const FormularioCalculadora = () => {
  const [tipoTarifa, setTipoTarifa] = useState("Domestica");
  const [periodo, setPeriodo] = useState("Mensual");
  const [ultimoCobro, setUltimoCobro] = useState(2500);

  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [resultado, setResultado] = useState(null);

  const estados = [
    {
      nombre: "Coahuila",
      municipios: [
        "Torreón",
        "Matamoros",
        "San Pedro",
      ],
    },
    {
      nombre: "Durango",
      municipios: [
        "Gómez Palacio",
        "Lerdo",
      ],
    },
  ];

  const empresas = [
    {
      id: 1,
      nombre: "Green Energy Laguna",
      municipio: "Torreón",
    },
    {
      id: 2,
      nombre: "Solar Torreón",
      municipio: "Torreón",
    },
    {
      id: 3,
      nombre: "EcoPanel Norte",
      municipio: "Gómez Palacio",
    },
    {
      id: 4,
      nombre: "Energía Lerdo",
      municipio: "Lerdo",
    },
  ];

  const municipiosDisponibles =
    estados.find((e) => e.nombre === estado)
      ?.municipios || [];

  const empresasDisponibles =
    empresas.filter(
      (e) => e.municipio === municipio
    );

  const calcular = () => {
    const precios = {
      Domestica: 3.2,
      Comercial: 4.5,
      Industrial: 3.5,
      Agricola: 1.5,
    };

    const precioKwh =
      precios[tipoTarifa];

    const consumoMensual =
      ultimoCobro / precioKwh;

    const consumoAnual =
      consumoMensual * 12;

    const paneles = Math.ceil(
      consumoAnual / 1810
    );

    let ahorroTotal = 0;
    let tarifa = precioKwh;
    let produccion = consumoAnual;

    for (let i = 1; i <= 25; i++) {
      ahorroTotal +=
        produccion * tarifa;

      produccion *= 0.995;
      tarifa *= 1.03;
    }

    setResultado({
      paneles,
      consumoMensual:
        consumoMensual.toFixed(0),
      ahorro:
        ahorroTotal.toFixed(0),
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Simulador de Cotizaciones
      </h1>

      {/* TARIFAS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

        <button
          onClick={() =>
            setTipoTarifa("Domestica")
          }
          className={`p-6 rounded-2xl border-2 ${
            tipoTarifa === "Domestica"
              ? "bg-green-100 border-green-700"
              : "border-gray-300"
          }`}
        >
          🏠
          <h3 className="font-bold mt-2">
            Doméstica
          </h3>
        </button>

        <button
          onClick={() =>
            setTipoTarifa("Comercial")
          }
          className={`p-6 rounded-2xl border-2 ${
            tipoTarifa === "Comercial"
              ? "bg-green-100 border-green-700"
              : "border-gray-300"
          }`}
        >
          🏪
          <h3 className="font-bold mt-2">
            Comercial
          </h3>
        </button>

        <button
          onClick={() =>
            setTipoTarifa("Industrial")
          }
          className={`p-6 rounded-2xl border-2 ${
            tipoTarifa === "Industrial"
              ? "bg-green-100 border-green-700"
              : "border-gray-300"
          }`}
        >
          🏭
          <h3 className="font-bold mt-2">
            Industrial
          </h3>
        </button>

        <button
          onClick={() =>
            setTipoTarifa("Agricola")
          }
          className={`p-6 rounded-2xl border-2 ${
            tipoTarifa === "Agricola"
              ? "bg-green-100 border-green-700"
              : "border-gray-300"
          }`}
        >
          🚜
          <h3 className="font-bold mt-2">
            Agrícola
          </h3>
        </button>

      </div>

      {/* ESTADO Y MUNICIPIO */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div>
          <label className="font-bold block mb-2">
            Estado
          </label>

          <select
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setMunicipio("");
              setEmpresa("");
            }}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Seleccione
            </option>

            {estados.map((estado) => (
              <option
                key={estado.nombre}
                value={estado.nombre}
              >
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">
            Municipio
          </label>

          <select
            value={municipio}
            onChange={(e) => {
              setMunicipio(
                e.target.value
              );
              setEmpresa("");
            }}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Seleccione
            </option>

            {municipiosDisponibles.map(
              (municipio) => (
                <option
                  key={municipio}
                  value={municipio}
                >
                  {municipio}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">
            Empresa
          </label>

          <select
            value={empresa}
            onChange={(e) =>
              setEmpresa(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="">
              Seleccione
            </option>

            {empresasDisponibles.map(
              (empresa) => (
                <option
                  key={empresa.id}
                  value={empresa.nombre}
                >
                  {empresa.nombre}
                </option>
              )
            )}
          </select>
        </div>

      </div>

      {/* PERIODO */}

      <div className="mb-8">

        <label className="font-bold block mb-3">
          Periodo de Facturación
        </label>

        <div className="flex gap-8">

          <label>
            <input
              type="radio"
              checked={
                periodo === "Mensual"
              }
              onChange={() =>
                setPeriodo(
                  "Mensual"
                )
              }
            />
            <span className="ml-2">
              Mensual
            </span>
          </label>

          <label>
            <input
              type="radio"
              checked={
                periodo ===
                "Bimestral"
              }
              onChange={() =>
                setPeriodo(
                  "Bimestral"
                )
              }
            />
            <span className="ml-2">
              Bimestral
            </span>
          </label>

        </div>

      </div>

      {/* COBRO */}

      <div className="mb-10">

        <h3 className="font-bold mb-3">
          Último Recibo
        </h3>

        <div className="text-center text-4xl text-green-700 font-bold mb-4">
          $
          {ultimoCobro.toLocaleString()}
        </div>

        <input
          type="range"
          min="100"
          max="30000"
          step="100"
          value={ultimoCobro}
          onChange={(e) =>
            setUltimoCobro(
              Number(
                e.target.value
              )
            )
          }
          className="w-full"
        />

        <div className="flex justify-between text-gray-500 mt-2">
          <span>$100</span>
          <span>$30,000</span>
        </div>

      </div>

      {/* BOTON */}

      <div className="text-center mb-10">

        <button
          onClick={calcular}
          className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-full text-xl font-bold"
        >
          Calcular
        </button>

      </div>

      {/* RESULTADO */}

      {resultado && (
        <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Resultado
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="font-bold">
                Consumo Mensual
              </p>

              <p className="text-2xl">
                {
                  resultado.consumoMensual
                }{" "}
                kWh
              </p>
            </div>

            <div>
              <p className="font-bold">
                Paneles Requeridos
              </p>

              <p className="text-2xl">
                {resultado.paneles}
              </p>
            </div>

            <div>
              <p className="font-bold">
                Ahorro a 25 años
              </p>

              <p className="text-2xl text-green-700 font-bold">
                $
                {Number(
                  resultado.ahorro
                ).toLocaleString()}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default FormularioCalculadora;