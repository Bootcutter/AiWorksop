using WorkshopApi.Models;
using WorkshopApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddSingleton<ProductRepository>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
        policy.WithOrigins("http://localhost:5000", "https://localhost:7000", "http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("DevPolicy");
}

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseDefaultFiles();   // serves index.html for "/"
app.UseStaticFiles();    // serves wwwroot/**

app.MapGet("/api/products", (ProductRepository repo) =>
    Results.Ok(repo.GetAll()))
.WithName("GetProducts");

app.MapGet("/api/products/{id:int}", (int id, ProductRepository repo) =>
{
    var product = repo.GetById(id);
    return product is not null
        ? Results.Ok(product)
        : Results.Problem(
            detail: $"No product with id {id} was found.",
            statusCode: StatusCodes.Status404NotFound,
            title: "Product not found");
})
.WithName("GetProductById");

app.Run();

