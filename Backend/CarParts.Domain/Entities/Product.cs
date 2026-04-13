using System;
using System.Collections.Generic;

namespace CarParts.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public bool IsFeatured { get; set; }

        public string? CarMake { get; set; }
        public string? CarModel { get; set; }
        public string? CarEngine { get; set; }
        public string? ImageUrl { get; set; }
    }
}
