using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace API_red_panel.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        [Column("id_usuario")]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [Column("correo")]
        public string Correo { get; set; } = string.Empty;

        [Column("password_hash")]
        public string Password { get; set; } = string.Empty;

        [Column("rol")]
        public string? Rol { get; set; }

        [Column("estado")]
        public string? Estado { get; set; }
    }
}
