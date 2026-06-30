const ResultadoCotisacion = ({ resultado }) => {
  return (
    <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Resultado
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="border p-4 rounded">
          <h3 className="font-bold">
            Consumo Mensual
          </h3>
          <p>
            {resultado.consumoMensual} kWh
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold">
            Consumo Anual
          </h3>
          <p>
            {resultado.consumoAnual} kWh
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold">
            Paneles Requeridos
          </h3>
          <p>
            {resultado.paneles}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-bold">
            Proveedor
          </h3>
          <p>
            {resultado.proveedor}
          </p>
        </div>

      </div>

      <div className="mt-6 bg-green-100 p-6 rounded-xl">

        <h3 className="text-2xl font-bold text-green-800">
          Ahorro Estimado a 25 Años
        </h3>

        <p className="text-4xl font-bold mt-2">
          $
          {Number(
            resultado.ahorro25
          ).toLocaleString()}
        </p>

      </div>

    </div>
  );
};

export default ResultadoCotisacion;