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
                new Category { Id = 1, Name = "Motor Yağları" },
                new Category { Id = 2, Name = "Fren Parçaları" },
                new Category { Id = 3, Name = "Kayış & Kasnak" },
                new Category { Id = 4, Name = "Vites & Şanzıman" },
                new Category { Id = 5, Name = "Aydınlatma & Ayna" },
                new Category { Id = 6, Name = "Motor Parçaları" },
                new Category { Id = 7, Name = "Süspansiyon" },
                new Category { Id = 8, Name = "Diğer" }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Bosch 4 Tırnak Buji Seti", Brand = "Bosch", Price = 450.00m, Stock = 50, CategoryId = 6, IsFeatured = true, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "2.0" },
                new Product { Id = 2, Name = "Brembo Ön Fren Balatası", Brand = "Brembo", Price = 1250.00m, Stock = 30, CategoryId = 2, IsFeatured = true, CarMake = "Audi", CarModel = "A4", CarEngine = "1.8 TFSI" },
                new Product { Id = 3, Name = "Monroe Arka Amortisör", Brand = "Monroe", Price = 2100.00m, Stock = 15, CategoryId = 7, IsFeatured = false, CarMake = "Mercedes", CarModel = "C Serisi", CarEngine = "1.6" },
                new Product { Id = 4, Name = "Osram Night Breaker H7 Ampul", Brand = "Osram", Price = 650.00m, Stock = 100, CategoryId = 5, IsFeatured = true, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.4 TSI" },
                new Product { Id = 5, Name = "Castrol Edge 5W-30 Motor Yağı (4L)", Brand = "Castrol", Price = 1100.00m, Stock = 80, CategoryId = 1, IsFeatured = false, CarMake = "BMW", CarModel = "5 Serisi", CarEngine = "2.0d" },
                new Product { Id = 6, Name = "TRW Fren Diski Ön", Brand = "TRW", Price = 1850.00m, Stock = 20, CategoryId = 2, IsFeatured = false, CarMake = "Audi", CarModel = "A6", CarEngine = "2.0 TDI" },
                new Product { Id = 7, Name = "Varta 72 Amper Akü", Brand = "Varta", Price = 3200.00m, Stock = 10, CategoryId = 8, IsFeatured = true, CarMake = "Mercedes", CarModel = "E Serisi", CarEngine = "2.0" },
                new Product { Id = 8, Name = "KYB Ön Helezon Yayı", Brand = "KYB", Price = 850.00m, Stock = 25, CategoryId = 7, IsFeatured = false, CarMake = "Volkswagen", CarModel = "Passat", CarEngine = "1.6 TDI" },
                new Product { Id = 9, Name = "Mann Hava Filtresi", Brand = "Mann", Price = 350.00m, Stock = 100, CategoryId = 8, IsFeatured = true, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "1.6" },
                new Product { Id = 10, Name = "Bosch Silecek Takımı", Brand = "Bosch", Price = 400.00m, Stock = 60, CategoryId = 8, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "2.0 TDI" },

                // Audi A4 1.8 TFSI Özel Parçalar
                new Product { Id = 21, Name = "Audi A4 1.8 TFSI Turbo Şarj Ünitesi", Brand = "Audi Genuine", Price = 24500.00m, Stock = 5, CategoryId = 6, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "1.8 TFSI", ImageUrl = "/images/products/055c217b-83a7-4d9e-8b4f-5cba7d064f95.png" },
                new Product { Id = 22, Name = "Audi A4 1.8 TFSI Yağ Pompası", Brand = "Febi", Price = 3200.00m, Stock = 12, CategoryId = 6, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "1.8 TFSI", ImageUrl = "/images/products/0d4c4ffe-6832-4319-97ec-4274e88b439a.png" },
                new Product { Id = 23, Name = "Audi A4 1.8 TFSI Ateşleme Bobini", Brand = "NGK", Price = 1150.00m, Stock = 40, CategoryId = 6, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "1.8 TFSI", ImageUrl = "/images/products/0e65670d-b597-4ea5-9dc0-78cf57ff09b4.png" },

                // BMW 3 Serisi 2.0 Özel Parçalar
                new Product { Id = 24, Name = "BMW 3 Serisi 2.0 Eksantrik Mili Sensörü", Brand = "BMW Genuine", Price = 2850.00m, Stock = 15, CategoryId = 6, IsFeatured = false, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "2.0", ImageUrl = "/images/products/25a236b7-a9e8-45de-be5d-80f93d280820.png" },
                new Product { Id = 25, Name = "BMW 3 Serisi 2.0 Su Radyatörü", Brand = "Behr", Price = 5400.00m, Stock = 8, CategoryId = 6, IsFeatured = false, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "2.0", ImageUrl = "/images/products/273806d1-ca41-4d82-8a80-cb551f584af9.png" },
                new Product { Id = 26, Name = "BMW 3 Serisi 2.0 Debriyaj Seti", Brand = "Sachs", Price = 8900.00m, Stock = 6, CategoryId = 4, IsFeatured = false, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "2.0", ImageUrl = "/images/products/34a1403a-979a-4d7c-ba0b-7f9ec3f17d5a.png" },

                // Volkswagen Golf 1.4 TSI Özel Parçalar
                new Product { Id = 27, Name = "VW Golf 1.4 TSI Triger Kayışı Seti", Brand = "Continental", Price = 4200.00m, Stock = 20, CategoryId = 3, IsFeatured = false, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.4 TSI", ImageUrl = "/images/products/54c25b60-d2d6-4a9b-b993-3c1ca2f6f882.png" },
                new Product { Id = 28, Name = "VW Golf 1.4 TSI Yakıt Enjektörü", Brand = "Bosch", Price = 3100.00m, Stock = 24, CategoryId = 6, IsFeatured = false, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.4 TSI", ImageUrl = "/images/products/5e4b4065-31d0-4bc7-be75-ce2aa9895e4a.png" },
                new Product { Id = 30, Name = "VW Golf 1.4 TSI Termostat Gövdesi", Brand = "Mahle", Price = 1850.00m, Stock = 15, CategoryId = 6, IsFeatured = false, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.4 TSI", ImageUrl = "/images/products/6a71e24a-7681-4b0e-bbe0-ac3a113f12b0.png" },

                // Yeni Eklenen Ürünler (Görselden)
                // Motor Yağları (CategoryId = 1)
                new Product { Id = 31, Name = "0w20 Motor Yağı 4L", Brand = "Castrol", Price = 1450.00m, Stock = 100, CategoryId = 1, IsFeatured = true, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/0w20-motor-yagi.webp" },
                new Product { Id = 32, Name = "0w30 Motor Yağı 4L", Brand = "Mobil 1", Price = 1550.00m, Stock = 85, CategoryId = 1, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/0w30-motor-yagi.webp" },
                new Product { Id = 33, Name = "0w40 Motor Yağı 4L", Brand = "Shell", Price = 1650.00m, Stock = 70, CategoryId = 1, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/0w40-motor-yagi.webp" },
                new Product { Id = 34, Name = "5w20 Motor Yağı 4L", Brand = "Motul", Price = 1350.00m, Stock = 90, CategoryId = 1, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/5w20-motor-yagi.webp" },
                new Product { Id = 35, Name = "5w30 Motor Yağı 4L", Brand = "Liqui Moly", Price = 1750.00m, Stock = 120, CategoryId = 1, IsFeatured = true, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/5w30-motor-yagi.webp" },
                
                // Vites & Şanzıman (CategoryId = 4)
                new Product { Id = 36, Name = "75w80 Şanzıman Yağı 1L", Brand = "SWAG", Price = 450.00m, Stock = 50, CategoryId = 4, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/75w80 şanzımanYağı 1L SWAG.webp" },
                new Product { Id = 37, Name = "75w Şanzıman Yağı 1L", Brand = "FEBI", Price = 480.00m, Stock = 45, CategoryId = 4, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/75wşanzımanYağı!l FEBİ.webp" },
                new Product { Id = 38, Name = "Şanzıman Filtresi", Brand = "SWAG", Price = 1200.00m, Stock = 20, CategoryId = 4, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "2.0 TDI", ImageUrl = "/images/products/şanzımanfiltresiSWAG.webp" },
                new Product { Id = 39, Name = "Şanzıman Karteri", Brand = "TOPRAN", Price = 3500.00m, Stock = 10, CategoryId = 4, IsFeatured = false, CarMake = "BMW", CarModel = "3 Serisi", CarEngine = "2.0", ImageUrl = "/images/products/şanzımanKarteriTOPRAN.webp" },

                // Süspansiyon (CategoryId = 7)
                new Product { Id = 40, Name = "Amortisör Arka (OE)", Brand = "MONROE", Price = 2250.00m, Stock = 30, CategoryId = 7, IsFeatured = true, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.6 TDI", ImageUrl = "/images/products/amortisörMONROE.webp" },
                new Product { Id = 41, Name = "Amortisör Ön", Brand = "SACHS", Price = 2450.00m, Stock = 25, CategoryId = 7, IsFeatured = false, CarMake = "Audi", CarModel = "A4", CarEngine = "1.8 TFSI", ImageUrl = "/images/products/AmortisörSACHS.webp" },
                new Product { Id = 42, Name = "Amortisör Takozu Ön", Brand = "FEBI", Price = 850.00m, Stock = 40, CategoryId = 7, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/amortisörtakozuFEBİ.webp" },
                new Product { Id = 43, Name = "Amortisör Takozu Arka", Brand = "SWAG", Price = 750.00m, Stock = 35, CategoryId = 7, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/amörtisörtakozuSWAG.webp" },

                // Aydınlatma & Ayna (CategoryId = 5)
                new Product { Id = 44, Name = "Sinyal Ampulü (Turuncu)", Brand = "BOSCH", Price = 45.00m, Stock = 200, CategoryId = 5, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/AmpülBOSCH.webp" },
                new Product { Id = 45, Name = "H7 Far Ampulü", Brand = "BOSCH", Price = 120.00m, Stock = 150, CategoryId = 5, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/AmpülBosch2.webp" },
                new Product { Id = 46, Name = "Stop Lambası Arka", Brand = "ULO", Price = 4200.00m, Stock = 8, CategoryId = 5, IsFeatured = false, CarMake = "Mercedes", CarModel = "C Serisi", CarEngine = "1.6", ImageUrl = "/images/products/StopLambasıULO.webp" },

                // Fren Parçaları (CategoryId = 2)
                new Product { Id = 47, Name = "Ön Fren Balatası", Brand = "BOSCH", Price = 1850.00m, Stock = 60, CategoryId = 2, IsFeatured = true, CarMake = "Volkswagen", CarModel = "Passat", CarEngine = "1.6 TDI", ImageUrl = "/images/products/frenbalatasıBOSCH.webp" },
                new Product { Id = 48, Name = "Arka Fren Balatası", Brand = "LPR", Price = 1150.00m, Stock = 55, CategoryId = 2, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/frenbalatasıLPR.webp" },
                new Product { Id = 49, Name = "Ön Fren Balatası (MGA)", Brand = "MGA", Price = 950.00m, Stock = 70, CategoryId = 2, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/frenbalatasıMGA.webp" },
                new Product { Id = 50, Name = "Ön Fren Diski", Brand = "FEBI", Price = 2100.00m, Stock = 40, CategoryId = 2, IsFeatured = false, CarMake = "Audi", CarModel = "A6", CarEngine = "2.0 TDI", ImageUrl = "/images/products/Frendiski(FEBİ).webp" },
                new Product { Id = 51, Name = "Arka Fren Diski", Brand = "SWAG", Price = 1750.00m, Stock = 35, CategoryId = 2, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/FrendiskiSWAG.webp" },
                new Product { Id = 52, Name = "Ön Fren Hortumu", Brand = "FEBI", Price = 350.00m, Stock = 100, CategoryId = 2, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/FrenHortumuFEBİ.webp" },

                // Motor Parçaları (CategoryId = 6)
                new Product { Id = 53, Name = "Eksantrik Devir Sensörü", Brand = "DELPHI", Price = 1450.00m, Stock = 25, CategoryId = 6, IsFeatured = false, CarMake = "BMW", CarModel = "5 Serisi", CarEngine = "2.0d", ImageUrl = "/images/products/EksantrikSensörüDelphi.webp" },
                new Product { Id = 54, Name = "Eksantrik Sensörü", Brand = "MGA", Price = 850.00m, Stock = 30, CategoryId = 6, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/EksantrikSensörüMGA.webp" },
                new Product { Id = 55, Name = "Üst Kapak Contası", Brand = "ELRING", Price = 950.00m, Stock = 50, CategoryId = 6, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/üstkapakcontasıELRİNG.webp" },

                // Kayış & Kasnak (CategoryId = 3)
                new Product { Id = 56, Name = "Triger Kayışı", Brand = "CONTITECH", Price = 1100.00m, Stock = 45, CategoryId = 3, IsFeatured = false, CarMake = "Volkswagen", CarModel = "Golf", CarEngine = "1.4 TSI", ImageUrl = "/images/products/TrigerkayışıCONTITECH.webp" },
                new Product { Id = 57, Name = "V Kayışı", Brand = "DAYCO", Price = 450.00m, Stock = 80, CategoryId = 3, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/trigerkayışıDAYCO.webp" },
                new Product { Id = 58, Name = "Triger Seti", Brand = "HEPU", Price = 4850.00m, Stock = 15, CategoryId = 3, IsFeatured = true, CarMake = "Audi", CarModel = "A4", CarEngine = "2.0 TDI", ImageUrl = "/images/products/TrigersetiHEPU.webp" },
                new Product { Id = 59, Name = "Triger Seti (INA)", Brand = "INA", Price = 4650.00m, Stock = 18, CategoryId = 3, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/TrigersetiINA.webp" },

                // Diğer (CategoryId = 8)
                new Product { Id = 60, Name = "Araç Şarj Kablosu", Brand = "Hepsi", Price = 2500.00m, Stock = 10, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/diğeraraçşarjkablosu.webp" },
                new Product { Id = 61, Name = "Korna 12V", Brand = "Hepsi", Price = 350.00m, Stock = 60, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/diğerkorna 12v.webp" },
                new Product { Id = 62, Name = "Korna 24V", Brand = "Hepsi", Price = 400.00m, Stock = 40, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/diğerkorna24v.webp" },
                new Product { Id = 63, Name = "Trafik Seti", Brand = "GOODYEAR", Price = 850.00m, Stock = 100, CategoryId = 8, IsFeatured = true, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/diğertrafiksetiGOODYEAR.webp" },
                new Product { Id = 64, Name = "Akü Takviye Cihazı", Brand = "BOSCH", Price = 3200.00m, Stock = 15, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi", ImageUrl = "/images/products/diğeraküşarjCihazıBOSCH.webp" },
                new Product { Id = 65, Name = "Continental Lastik 205/55 R16", Brand = "Continental", Price = 2450.00m, Stock = 40, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi" },
                new Product { Id = 66, Name = "Kriko Seti 2 Ton", Brand = "Hepsi", Price = 1250.00m, Stock = 20, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi" },
                new Product { Id = 67, Name = "Yangın Söndürme Tüpü 2kg", Brand = "Hepsi", Price = 450.00m, Stock = 100, CategoryId = 8, IsFeatured = false, CarMake = "Hepsi", CarModel = "Hepsi", CarEngine = "Hepsi" }
            );
        }
    }
}
