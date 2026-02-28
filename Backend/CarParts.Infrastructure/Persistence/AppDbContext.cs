using CarParts.Application.Interfaces;
using CarParts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarParts.Infrastructure.Persistence
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CartItem>()
                .HasKey(ci => new { ci.CartId, ci.ProductId });

            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => new { oi.OrderId, oi.ProductId });
                
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
                
            modelBuilder.Entity<OrderItem>()
                .Property(o => o.UnitPrice)
                .HasColumnType("decimal(18,2)");
                
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasColumnType("decimal(18,2)");

            // Seed Data
            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = 1,
                Username = "admin",
                Email = "admin@example.com",
                PasswordHash = "admin123", // Plain text initially, can be hashed in production
                Role = "Admin"
            });

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Motor Parçaları" },
                new Category { Id = 2, Name = "Fren Sistemi" },
                new Category { Id = 3, Name = "Süspansiyon" },
                new Category { Id = 4, Name = "Elektrik & Aydınlatma" }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Bosch 4 Tırnak Buji Seti", Brand = "Bosch", Price = 450.00m, Stock = 50, CategoryId = 1 },
                new Product { Id = 2, Name = "Brembo Ön Fren Balatası", Brand = "Brembo", Price = 1250.00m, Stock = 30, CategoryId = 2 },
                new Product { Id = 3, Name = "Monroe Arka Amortisör", Brand = "Monroe", Price = 2100.00m, Stock = 15, CategoryId = 3 },
                new Product { Id = 4, Name = "Osram Night Breaker H7 Ampul", Brand = "Osram", Price = 650.00m, Stock = 100, CategoryId = 4 },
                new Product { Id = 5, Name = "Castrol Edge 5W-30 Motor Yağı (4L)", Brand = "Castrol", Price = 1100.00m, Stock = 80, CategoryId = 1 },
                new Product { Id = 6, Name = "TRW Fren Diski Ön", Brand = "TRW", Price = 1850.00m, Stock = 20, CategoryId = 2 },
                new Product { Id = 7, Name = "Varta 72 Amper Akü", Brand = "Varta", Price = 3200.00m, Stock = 10, CategoryId = 4 },
                new Product { Id = 8, Name = "KYB Ön Helezon Yayı", Brand = "KYB", Price = 850.00m, Stock = 25, CategoryId = 3 }
            );
        }
    }
}
