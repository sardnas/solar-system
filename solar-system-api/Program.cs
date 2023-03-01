using Microsoft.EntityFrameworkCore;
using solar_system_api.Database;
using System.Drawing;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var ConnectionString = builder.Configuration["ConnectionString"];
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(ConnectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("api/solardata", async (AppDBContext db) =>
{
    return await db.SolarData.ToListAsync();
})
.WithName("GetSolarData");

app.MapGet("api/solardata/planets", async (AppDBContext db) =>
{
    var planets = db.SolarData.Where(x => x.IsPlanet == true);
    return await planets.ToListAsync();
})
.WithName("GetPlanets");

app.MapGet("api/solardata/orbits", async (AppDBContext db, string name) =>
{
    var orbits = db.SolarData.Where(x => x.Orbit == name);
    return await orbits.ToListAsync();  
})
.WithName("GetOrbits");

app.MapGet("api/solardata/{id}", async (AppDBContext db, int id) =>
{
    return await db.SolarData.FindAsync(id);
})
.WithName("GetSolarBody");

app.Run();