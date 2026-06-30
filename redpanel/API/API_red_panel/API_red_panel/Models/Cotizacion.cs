using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_red_panel.Models
{
    public class Cotizacion
    {
        [Table("Cotizaciones")]
        public class Cotizaciones
        {
            [Key]
            [Column("CotizacionID")]
            public int Id { get; set; }

            [Column("ClienteID")]
            public int ClienteID { get; set; }

            [Column("Estado")]
            public string? Estado { get; set; }

            [Column("Municipio")]
            public string? Municipio { get; set; }

            [Column("Empresa")]
            public string? Empresa { get; set; }

            [Column("TipoTarifa")]
            public string? TipoTarifa { get; set; }

            [Column("Periodo")]
            public string? Periodo { get; set; }

            [Column("CantidadRecibos")]
            public int CantidadRecibos { get; set; }

            [Column("ConsumoPromedio")]
            public decimal ConsumoPromedio { get; set; }

            [Column("ConsumoMensual")]
            public decimal ConsumoMensual { get; set; }

            [Column("Paneles")]
            public int Paneles { get; set; }

            [Column("Ahorro")]
            public decimal Ahorro { get; set; }

            [Column("Fecha")]
            public DateTime? Fecha { get; set; }
        }
    }

}
