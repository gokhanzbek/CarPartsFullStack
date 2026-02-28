using System;
using System.Collections.Generic;

namespace CarParts.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public AppUser? User { get; set; }

        public decimal TotalPrice { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
