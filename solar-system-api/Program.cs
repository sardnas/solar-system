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

app.UseCors(options => options.WithOrigins("http://localhost:5173")
.AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("api/solardata", (AppDBContext db) =>
{
    return db.SolarData.ToList();
})
.WithName("GetSolarData");

app.MapGet("api/solardata/planets", (AppDBContext db) =>
{
    return db.SolarData.Where(x => x.IsPlanet == true).ToList();
})
.WithName("GetPlanets");

app.MapGet("api/solardata/orbits", (AppDBContext db, string name) =>
{
    return db.SolarData.Where(x => x.Orbit == name).ToList();
})
.WithName("GetOrbits");

app.MapGet("api/solardata/{id}", (AppDBContext db, int id) =>
{
    return db.SolarData.Where(x => x.Id == id).ToList();
})
.WithName("GetSolarBody");

app.Run();