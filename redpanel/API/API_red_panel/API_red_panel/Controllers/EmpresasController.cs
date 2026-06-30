using API_red_panel.Data;
using API_red_panel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_red_panel.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class EmpresasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpresasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empresas>>> GetEmpresas()
        {
            return await _context.Empresas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Empresas>> GetEmpresa(int id)
        {
            var empresa = await _context.Empresas.FindAsync(id);

            if (empresa == null)
                return NotFound("Empresa no encontrada");

            return empresa;
        }

        [HttpPost]
        public async Task<ActionResult<Empresas>> PostEmpresa(Empresas empresa)
        {
            empresa.Fecha = DateTime.Now;

            _context.Empresas.Add(empresa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmpresa), new { id = empresa.Id }, empresa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpresa(int id, Empresas empresa)
        {
            if (id != empresa.Id)
                return BadRequest("El ID no coincide");

            var existe = await _context.Empresas.AnyAsync(e => e.Id == id);

            if (!existe)
                return NotFound("Empresa no encontrada");

            _context.Entry(empresa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error al actualizar la empresa");
            }

            return Ok("Empresa actualizada");
        }

      //  [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpresa(int id)
        {
            var empresa = await _context.Empresas.FindAsync(id);

            if (empresa == null)
                return NotFound("Empresa no encontrada");

            _context.Empresas.Remove(empresa);
            await _context.SaveChangesAsync();

            return Ok("Empresa eliminada");
        }
    }
}

