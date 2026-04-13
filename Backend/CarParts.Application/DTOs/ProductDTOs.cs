namespace CarParts.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public string? CarMake { get; set; }
        public string? CarModel { get; set; }
        public string? CarEngine { get; set; }
        public string? ImageUrl { get; set; }
    }
}
