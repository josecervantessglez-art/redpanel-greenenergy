import { useState } from "react";
import axios from "axios";
const API_URL = "https://xv0d1rd8-7169.usw3.devtunnels.ms/api/Cotizaciones";

const datos = {
  estados: {
    Coahuila: ["Torreón", "Matamoros", "San Pedro"],
    Durango: ["Gómez Palacio", "Lerdo"],
  },
  empresas: [
    { nombre: "Green Energy Laguna", municipio: "Torreón" },
    { nombre: "Solar Torreón", municipio: "Torreón" },
    { nombre: "EcoPanel Norte", municipio: "Gómez Palacio" },
    { nombre: "Energía Lerdo", municipio: "Lerdo" },
  ],
  precios: { Domestica: 3.2, Comercial: 4.5, Industrial: 3.5, Agricola: 1.5 },
  meses: [],
  bim: [],
};

const FormularioCalculadora = () => {
  const [tipoTarifa, setTipoTarifa] = useState("Domestica");
  const [periodo, setPeriodo] = useState("Mensual");
  const [cantidad, setCantidad] = useState(1);
  const [consumo, setConsumos] = useState({});

  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const [resultado, setResultado] = useState(null);

  const maxCant = periodo === "Mensual" ? 12 : 6;
  const labels = periodo === "Mensual" ? datos.meses : datos.bim;

  const municipiosDisponibles = datos.estados[estado] || [];
  const empresasDisponibles = datos.empresas.filter((e) => e.municipio === municipio);

  const handlePeriodo = (p) => {
    setPeriodo(p);
    setCantidad(1);
    setConsumos({});
    setResultado(null);
  };

  const handleCantidad = (delta) => {
    const nueva = Math.max(1, Math.min(maxCant, cantidad + delta));
    setCantidad(nueva);
    setResultado(null);
  };

  const handleRecibo = (index, value) => {
    setConsumos((prev) => ({ ...prev, [index]: value }));
  };

  const guardarCotizacion = async (resultadoCalculado) => {
  try {

    const datosEnviar = {
      nombre,
      correo,
      telefono,

      estado,
      municipio,
      empresa,

      tipoTarifa,
      periodo,

      Consumos: Object.values(consumo).map(Number),

      consumoMensual: resultadoCalculado.consumoMensual,
      paneles: resultadoCalculado.paneles,
      ahorro: resultadoCalculado.ahorro
    };

    await axios.post(API_URL, datosEnviar);

    console.log("Cotización guardada");

  } catch (error) {
    console.error(error);

    alert("No fue posible guardar la información.");
  }
};

  const calcular = async () => {
    const valores = [];
    for (let i = 0; i < cantidad; i++) {
      const v = parseFloat(consumo[i]);
      if (!isNaN(v) && v > 0) valores.push(v);
    }
    if (valores.length === 0) {
      alert("Ingresa al menos un recibo para continuar.");
      return;
    }

    const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
    const precioKwh = datos.precios[tipoTarifa];

    const consumoMensual =
      periodo === "Bimestral"
        ? promedio / precioKwh / 2
        : promedio / precioKwh;

    const consumoAnual = consumoMensual * 12;
    const paneles = Math.ceil(consumoAnual / 1810);

    let ahorro = 0;
    let t = precioKwh;
    let prod = consumoAnual;
    for (let i = 0; i < 25; i++) {
      ahorro += prod * t;
      prod *= 0.995;
      t *= 1.03;
    }

    const resultadoCalculado = {
    consumoMensual: Math.round(consumoMensual),
    paneles,
    ahorro: Math.round(ahorro),
};

setResultado(resultadoCalculado);

await guardarCotizacion(resultadoCalculado);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Simulador de Cotizaciones
      </h1>
      
      {/* DATOS DEL CLIENTE */}
<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div>
    <label className="font-bold block mb-2">
      Nombre
    </label>

    <input
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Ingrese su nombre"
      className="w-full border p-3 rounded-lg"
      required
    />
  </div>

  <div>
    <label className="font-bold block mb-2">
      Correo electrónico
    </label>

    <input
      type="email"
      value={correo}
      onChange={(e) => setCorreo(e.target.value)}
      placeholder="correo@ejemplo.com"
      className="w-full border p-3 rounded-lg"
      required
    />
  </div>

  <div>
    <label className="font-bold block mb-2">
      Número telefónico
    </label>

    <input
      type="tel"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      placeholder="8711234567"
      className="w-full border p-3 rounded-lg"
      maxLength={10}
      required
    />
  </div>

</div>

      {/* TARIFAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { val: "Domestica", emoji: "🏠", label: "Doméstica" },
          { val: "Comercial", emoji: "🏪", label: "Comercial" },
          { val: "Industrial", emoji: "🏭", label: "Industrial" },
          { val: "Agricola", emoji: "🚜", label: "Agrícola" },
        ].map(({ val, emoji, label }) => (
          <button
            key={val}
            onClick={() => setTipoTarifa(val)}
            className={`p-6 rounded-2xl border-2 ${
              tipoTarifa === val
                ? "bg-green-100 border-green-700"
                : "border-gray-300"
            }`}
          >
            {emoji}
            <h3 className="font-bold mt-2">{label}</h3>
          </button>
        ))}
      </div>

      {/* ESTADO, MUNICIPIO Y EMPRESA */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="font-bold block mb-2">Estado</label>
          <select
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setMunicipio("");
              setEmpresa("");
            }}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Seleccione</option>
            {Object.keys(datos.estados).map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">Municipio</label>
          <select
            value={municipio}
            onChange={(e) => {
              setMunicipio(e.target.value);
              setEmpresa("");
            }}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Seleccione</option>
            {municipiosDisponibles.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">Empresa</label>
          <select
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Seleccione</option>
            {empresasDisponibles.map((e) => (
              <option key={e.nombre} value={e.nombre}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PERIODO */}
      <div className="mb-8">
        <label className="font-bold block mb-3">Periodo de Facturación</label>
        <div className="flex gap-8">
          <label>
            <input
              type="radio"
              checked={periodo === "Mensual"}
              onChange={() => handlePeriodo("Mensual")}
            />
            <span className="ml-2">Mensual</span>
          </label>
          <label>
            <input
              type="radio"
              checked={periodo === "Bimestral"}
              onChange={() => handlePeriodo("Bimestral")}
            />
            <span className="ml-2">Bimestral</span>
          </label>
        </div>
      </div>

      {/* consumos */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">
            {cantidad} Consumo{cantidad > 1 ? "s" : ""}{" "}
            <span className="text-gray-400 font-normal text-sm">
              (hasta {maxCant})
            </span>
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCantidad(-1)}
              disabled={cantidad <= 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold disabled:opacity-30"
            >
              −
            </button>
            <span className="font-bold text-lg w-5 text-center">{cantidad}</span>
            <button
              onClick={() => handleCantidad(1)}
              disabled={cantidad >= maxCant}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: cantidad }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">{labels[i]}</span>
              <input
                type="number" min="0" step="10" placeholder="Kwh" value={consumo[i] || ""}  onChange={(e) => handleRecibo(i, e.target.value)}  className="border rounded-lg p-2 text-sm w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTÓN */}
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
          <h2 className="text-3xl font-bold mb-6">Resultado</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-bold">Consumo Mensual Promedio</p>
              <p className="text-2xl">{resultado.consumoMensual} kWh</p>
            </div>
            <div>
              <p className="font-bold">Paneles Requeridos</p>
              <p className="text-2xl">{resultado.paneles}</p>
            </div>
            <div>
              <p className="font-bold">Ahorro a 25 años</p>
              <p className="text-2xl text-green-700 font-bold">
                ${resultado.ahorro.toLocaleString("es-MX")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCalculadora;
