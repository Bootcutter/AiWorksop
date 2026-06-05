using WorkshopApi.Models;

namespace WorkshopApi.Repositories;

public class ProductRepository
{
    private static readonly IReadOnlyList<Product> _products =
    [
        new(1, "Laptop Pro 15",       "High-performance laptop for developers",        1299.99m, "Electronics"),
        new(2, "Mechanical Keyboard", "Tenkeyless with Cherry MX Brown switches",        149.99m, "Peripherals"),
        new(3, "4K Monitor",          "27-inch IPS panel, 144 Hz refresh rate",          599.99m, "Displays"),
        new(4, "USB-C Hub",           "7-in-1 hub: HDMI, USB-A, SD, PD charging",         49.99m, "Accessories"),
        new(5, "Webcam HD",           "1080p 60fps with built-in noise-cancelling mic",   89.99m, "Peripherals"),
    ];

    public IReadOnlyList<Product> GetAll() => _products;

    public Product? GetById(int id) =>
        _products.FirstOrDefault(p => p.Id == id);

    public IReadOnlyList<Product> Search(string? term)
    {
        if (string.IsNullOrWhiteSpace(term))
            return _products;

        var normalised = term.Trim();
        return _products
            .Where(p =>
                p.Name.Contains(normalised, StringComparison.OrdinalIgnoreCase) ||
                p.Description.Contains(normalised, StringComparison.OrdinalIgnoreCase) ||
                p.Category.Contains(normalised, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
}
