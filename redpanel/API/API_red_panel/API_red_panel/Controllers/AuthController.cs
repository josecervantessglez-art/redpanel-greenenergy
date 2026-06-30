using API_red_panel.Data;
using API_red_panel.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_red_panel.Controllers
{
    
        [Route("api/[Controller]")]
        [ApiController]
        public class AuthController : ControllerBase
        {
            private readonly AppDbContext _context;
            private readonly IConfiguration _configuration;
            public AuthController(AppDbContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            [HttpPost("login")]
            public async Task<IActionResult> Login(Models.LoginRequest request)
            {
                var usuario = await _context.Usuarios
     .FirstOrDefaultAsync(u => u.Nombre == request.NombreUsuario);
                if (usuario == null)
                    return Unauthorized("Credenciales incorrectas");
                if (usuario.Password != request.Contraseña)
                    return Unauthorized("Contraseña incorrecta");

                var token = GenerarToken(usuario);
                return Ok(new { token });
            }
            private string GenerarToken(Usuario usuario)
            {
                var jwtSettings = _configuration.GetSection("Jwt");
                var claims = new[]
                {
 new Claim(ClaimTypes.Name, usuario.Nombre),
 new Claim(ClaimTypes.Role, usuario.Rol),
 new Claim("UsuarioId", usuario.Id.ToString())
 };
                var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
                signingCredentials: creds
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
 
}
