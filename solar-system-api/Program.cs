using Microsoft.EntityFrameworkCore;
using solar_system_api.Database;
using solar_system_api.Products;

var builder = WebApplication.CreateBuilder(args);
var ConnectionString = builder.Configuration["ConnectionString"];

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(); 
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

// Adding endpoints 
app.AddSolarDataEndpoints();

app.Run();