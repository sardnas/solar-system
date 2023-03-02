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
//

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
//

var app = builder.Build();

app.UseCors("corsapp");

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