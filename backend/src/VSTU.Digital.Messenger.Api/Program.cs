using Microsoft.OpenApi.Models;
using VSTU.Digital.Messenger.Application;
using VSTU.Digital.Messenger.Infrastructure;
using VSTU.Digital.Messenger.Presentation.Hubs;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services
    .AddInfrastructure(configuration)
    .AddApplication(configuration);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddCors(o =>
{
    o.AddPolicy(name: "AllowAnyOrigin", p =>
    {
        p.AllowAnyOrigin();
        p.AllowAnyMethod();
        p.AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowAnyOrigin");

app.MapControllers();
app.MapHub<ChatHub>("/hub");

app.Run();