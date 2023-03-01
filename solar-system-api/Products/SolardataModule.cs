using Microsoft.EntityFrameworkCore;
using solar_system_api.Database;

namespace solar_system_api.Products
{
    public static class SolardataModule
    {
        public static void AddSolarDataEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("api/solardata", async (AppDBContext db) =>
            {
                return await db.SolarData.ToListAsync();
            });

            app.MapGet("api/solardata/planets", async (AppDBContext db) =>
            {
                var planets = db.SolarData.Where(x => x.IsPlanet == true);
                return await planets.ToListAsync();
            });

            app.MapGet("api/solardata/orbits", async (AppDBContext db, string name) =>
            {
                var orbits = db.SolarData.Where(x => x.Orbit == name);
                return await orbits.ToListAsync();
            });

            app.MapGet("api/solardata/{id}", async (AppDBContext db, int id) =>
            {
                return await db.SolarData.FindAsync(id);
            });
        }
    }
}
