using WorkshopApi.Repositories;
using Xunit;

namespace WorkshopApi.Tests;

public class ProductRepositoryTests
{
    private readonly ProductRepository _repo = new();

    // -------------------------------------------------------
    // GetAll
    // -------------------------------------------------------

    [Fact]
    public void GetAll_ReturnsNonEmptyList()
    {
        var products = _repo.GetAll();

        Assert.NotEmpty(products);
    }

    [Fact]
    public void GetAll_AllProductsHavePositiveId()
    {
        var products = _repo.GetAll();

        Assert.All(products, p => Assert.True(p.Id > 0));
    }

    [Fact]
    public void GetAll_AllProductsHaveNonEmptyName()
    {
        var products = _repo.GetAll();

        Assert.All(products, p => Assert.False(string.IsNullOrWhiteSpace(p.Name)));
    }

    [Fact]
    public void GetAll_AllProductsHaveNonEmptyCategory()
    {
        var products = _repo.GetAll();

        Assert.All(products, p => Assert.False(string.IsNullOrWhiteSpace(p.Category)));
    }

    [Fact]
    public void GetAll_AllProductsHavePositivePrice()
    {
        var products = _repo.GetAll();

        Assert.All(products, p => Assert.True(p.Price > 0));
    }

    [Fact]
    public void GetAll_HasNoDuplicateIds()
    {
        var products = _repo.GetAll();
        var distinctIds = products.Select(p => p.Id).Distinct();

        Assert.Equal(products.Count, distinctIds.Count());
    }

    // -------------------------------------------------------
    // GetById — found
    // -------------------------------------------------------

    [Theory]
    [InlineData(1)]
    [InlineData(3)]
    [InlineData(5)]
    public void GetById_KnownId_ReturnsProductWithMatchingId(int id)
    {
        var product = _repo.GetById(id);

        Assert.NotNull(product);
        Assert.Equal(id, product!.Id);
    }

    // -------------------------------------------------------
    // GetById — not found
    // -------------------------------------------------------

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(9999)]
    public void GetById_UnknownId_ReturnsNull(int id)
    {
        var product = _repo.GetById(id);

        Assert.Null(product);
    }
}
