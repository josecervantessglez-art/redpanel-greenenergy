using API_red_panel.Data;
using API_red_panel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_red_panel.Controller
{ 
        [Route("api/[controller]")]
        [ApiController]
      [Authorize]
        public class UsuariosController : ControllerBase
        {
            private readonly AppDbContext _context;

            public UsuariosController(AppDbContext context)
            {
                _context = context;
            }
         
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
            {
                return await _context.Usuarios.ToListAsync();
            }


            [HttpGet("{id}")]
            public async Task<ActionResult<Usuario>> GetUsuario(int id)
            {
                var usuario = await _context.Usuarios.FindAsync(id);

                if (usuario == null)
                    return NotFound("Usuario no encontrado");

                return usuario;
            }


            [AllowAnonymous]
            [HttpPost]
            public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
            {
                if (id != usuario.Id)
                    return BadRequest("El ID no coincide");

                var existe = await _context.Usuarios.AnyAsync(u => u.Id == id);

                if (!existe)
                    return NotFound("Usuario no encontrado");

                _context.Entry(usuario).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return StatusCode(500, "Error al actualizar el usuario");
                }

                return Ok("Usuario actualizado");
            }


            [Authorize(Roles = "admin")]
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteUsuario(int id)
            {
                var usuario = await _context.Usuarios.FindAsync(id);

                if (usuario == null)
                    return NotFound("Usuario no encontrado");

                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();

                return Ok("Usuario Eleminado");
            }
        }
    
}
