using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API_red_panel.Models
{
    [Table("Empresas")]
    public class Empresas
    {
        [Key]
        [Column("EmpresaID")]
        public int Id { get; set; }

        [Column("NombreComercial")]
        public string?  Nombre { get; set; } = string.Empty;
        [Column("RazonSocial")]
        public string? Razon { get; set; } = string.Empty;

        [Column("RFC")]
        public string? RFC { get; set; } = string.Empty;

        [Column("EmailContacto")]
        public string? Correo { get; set; } = string.Empty;

        [Column("Telefono")]
        public string? Telefono { get; set; } = string.Empty;

        [Column("Mision")]
        public string? mision { get; set; } = string.Empty;

        [Column("Vision")]
        public string? vision { get; set; } = string.Empty;

        [Column("DescripcionQueHace")]
        public string? Descripcion { get; set; } = string.Empty;

        [Column("LogoURL")]
        public string? logo { get; set; } = string.Empty;
        [Column("VideoPrincipalURL")]
        public string? video { get; set; } = string.Empty;

        [Column("MunicipioID")]
        public int? idmunicipio { get; set; }
        [Column("Activa")]
        public bool? Activa { get; set; }
        [Column("FechaRegistro")]
        public DateTime? Fecha { get; set; }


    }
}
