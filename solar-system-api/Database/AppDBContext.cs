using Microsoft.EntityFrameworkCore;
using solar_system_api.Database.models;

namespace solar_system_api.Database
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options) : base(options) { }
        public DbSet<SolarData> SolarData { get; set; }

    }
}
