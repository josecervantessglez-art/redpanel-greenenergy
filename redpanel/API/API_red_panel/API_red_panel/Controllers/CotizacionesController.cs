using API_red_panel.Data;
using Microsoft.AspNetCore.Mvc;
using static API_red_panel.Models.Cliente;
using static API_red_panel.Models.Cotizacion;
using Microsoft.EntityFrameworkCore;
namespace API_red_panel.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class CotizacionesController : ControllerBase
        {
            private readonly AppDbContext _context;

            public CotizacionesController(AppDbContext context)
            {
                _context = context;
            }

            [HttpPost]
            public async Task<IActionResult> GuardarCotizacion([FromBody] CotizacionRequest request)
            {
                var cliente = await _context.Clientes
                    .FirstOrDefaultAsync(c => c.Correo == request.Correo);

                if (cliente == null)
                {
                    cliente = new Clientes
                    {
                        Nombre = request.Nombre,
                        Correo = request.Correo,
                        Telefono = request.Telefono,
                        FechaRegistro = DateTime.Now
                    };

                    _context.Clientes.Add(cliente);
                    await _context.SaveChangesAsync();
                }

                decimal promedio = request.Consumos.Average();

                var cotizacion = new Cotizaciones
                {
                    ClienteID = cliente.Id,

                    Estado = request.Estado,

                    Municipio = request.Municipio,

                    Empresa = request.Empresa,

                    TipoTarifa = request.TipoTarifa,

                    Periodo = request.Periodo,

                    CantidadRecibos = request.Consumos.Count,

                    ConsumoPromedio = promedio,

                    ConsumoMensual = request.ConsumoMensual,

                    Paneles = request.Paneles,

                    Ahorro = request.Ahorro,

                    Fecha = DateTime.Now
                };

                _context.Cotizaciones.Add(cotizacion);

                await _context.SaveChangesAsync();

                return Ok("Cotización guardada correctamente.");
            }
        }

        public class CotizacionRequest
        {
            public string? Nombre { get; set; }

            public string? Correo { get; set; }

            public string? Telefono { get; set; }

            public string? Estado { get; set; }

            public string? Municipio { get; set; }

            public string? Empresa { get; set; }

            public string? TipoTarifa { get; set; }

            public string? Periodo { get; set; }

            public List<decimal> Consumos { get; set; } = new();

            public decimal ConsumoMensual { get; set; }

            public int Paneles { get; set; }

            public decimal Ahorro { get; set; }
        }
    
}

