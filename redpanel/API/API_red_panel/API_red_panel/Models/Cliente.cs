using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_red_panel.Models
{
    public class Cliente
    {
        [Table("Clientes")]
        public class Clientes
        {
            [Key]
            [Column("ClienteID")]
            public int Id { get; set; }

            [Column("Nombre")]
            public string? Nombre { get; set; } = string.Empty;

            [Column("Correo")]
            public string? Correo { get; set; } = string.Empty;

            [Column("Telefono")]
            public string? Telefono { get; set; } = string.Empty;

            [Column("FechaRegistro")]
            public DateTime? FechaRegistro { get; set; }
        }
    }
}
