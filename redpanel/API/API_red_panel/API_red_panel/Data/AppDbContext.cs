using API_red_panel.Models;
using Microsoft.EntityFrameworkCore;
using static API_red_panel.Models.Cliente;
using static API_red_panel.Models.Cotizacion;

namespace API_red_panel.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Empresas> Empresas { get; set; }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<Cotizaciones> Cotizaciones { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empresas>().HasKey(e => e.Id);
            modelBuilder.Entity<Usuario>().HasKey(u => u.Id);
            modelBuilder.Entity<Clientes>().HasKey(c => c.Id);
            modelBuilder.Entity<Cotizaciones>().HasKey(o => o.Id);
           

        }
    }
}
