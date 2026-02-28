using System.Collections.Generic;

namespace CarParts.Domain.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public AppUser? User { get; set; }

        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
