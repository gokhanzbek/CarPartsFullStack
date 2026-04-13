using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarParts.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProductsFromImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CarEngine", "CarMake", "CarModel", "CategoryId", "ImageUrl", "IsFeatured", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 31, "Castrol", "Hepsi", "Hepsi", "Hepsi", 1, null, true, "0w20 Motor Yağı 4L", 1450.00m, 100 },
                    { 32, "Mobil 1", "Hepsi", "Hepsi", "Hepsi", 1, null, false, "0w30 Motor Yağı 4L", 1550.00m, 85 },
                    { 33, "Shell", "Hepsi", "Hepsi", "Hepsi", 1, null, false, "0w40 Motor Yağı 4L", 1650.00m, 70 },
                    { 34, "Motul", "Hepsi", "Hepsi", "Hepsi", 1, null, false, "5w20 Motor Yağı 4L", 1350.00m, 90 },
                    { 35, "Liqui Moly", "Hepsi", "Hepsi", "Hepsi", 1, null, true, "5w30 Motor Yağı 4L", 1750.00m, 120 },
                    { 36, "SWAG", "Hepsi", "Hepsi", "Hepsi", 4, null, false, "75w80 Şanzıman Yağı 1L", 450.00m, 50 },
                    { 37, "FEBI", "Hepsi", "Hepsi", "Hepsi", 4, null, false, "75w Şanzıman Yağı 1L", 480.00m, 45 },
                    { 38, "SWAG", "2.0 TDI", "Audi", "A4", 4, null, false, "Şanzıman Filtresi", 1200.00m, 20 },
                    { 39, "TOPRAN", "2.0", "BMW", "3 Serisi", 4, null, false, "Şanzıman Karteri", 3500.00m, 10 },
                    { 40, "MONROE", "1.6 TDI", "Volkswagen", "Golf", 7, null, true, "Amortisör Arka (OE)", 2250.00m, 30 },
                    { 41, "SACHS", "1.8 TFSI", "Audi", "A4", 7, null, false, "Amortisör Ön", 2450.00m, 25 },
                    { 42, "FEBI", "Hepsi", "Hepsi", "Hepsi", 7, null, false, "Amortisör Takozu Ön", 850.00m, 40 },
                    { 43, "SWAG", "Hepsi", "Hepsi", "Hepsi", 7, null, false, "Amortisör Takozu Arka", 750.00m, 35 },
                    { 44, "BOSCH", "Hepsi", "Hepsi", "Hepsi", 5, null, false, "Sinyal Ampulü (Turuncu)", 45.00m, 200 },
                    { 45, "BOSCH", "Hepsi", "Hepsi", "Hepsi", 5, null, false, "H7 Far Ampulü", 120.00m, 150 },
                    { 46, "ULO", "1.6", "Mercedes", "C Serisi", 5, null, false, "Stop Lambası Arka", 4200.00m, 8 },
                    { 47, "BOSCH", "1.6 TDI", "Volkswagen", "Passat", 2, null, true, "Ön Fren Balatası", 1850.00m, 60 },
                    { 48, "LPR", "Hepsi", "Hepsi", "Hepsi", 2, null, false, "Arka Fren Balatası", 1150.00m, 55 },
                    { 49, "MGA", "Hepsi", "Hepsi", "Hepsi", 2, null, false, "Ön Fren Balatası (MGA)", 950.00m, 70 },
                    { 50, "FEBI", "2.0 TDI", "Audi", "A6", 2, null, false, "Ön Fren Diski", 2100.00m, 40 },
                    { 51, "SWAG", "Hepsi", "Hepsi", "Hepsi", 2, null, false, "Arka Fren Diski", 1750.00m, 35 },
                    { 52, "FEBI", "Hepsi", "Hepsi", "Hepsi", 2, null, false, "Ön Fren Hortumu", 350.00m, 100 },
                    { 53, "DELPHI", "2.0d", "BMW", "5 Serisi", 6, null, false, "Eksantrik Devir Sensörü", 1450.00m, 25 },
                    { 54, "MGA", "Hepsi", "Hepsi", "Hepsi", 6, null, false, "Eksantrik Sensörü", 850.00m, 30 },
                    { 55, "ELRING", "Hepsi", "Hepsi", "Hepsi", 6, null, false, "Üst Kapak Contası", 950.00m, 50 },
                    { 56, "CONTITECH", "1.4 TSI", "Volkswagen", "Golf", 3, null, false, "Triger Kayışı", 1100.00m, 45 },
                    { 57, "DAYCO", "Hepsi", "Hepsi", "Hepsi", 3, null, false, "V Kayışı", 450.00m, 80 },
                    { 58, "HEPU", "2.0 TDI", "Audi", "A4", 3, null, true, "Triger Seti", 4850.00m, 15 },
                    { 59, "INA", "Hepsi", "Hepsi", "Hepsi", 3, null, false, "Triger Seti (INA)", 4650.00m, 18 },
                    { 60, "Hepsi", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Araç Şarj Kablosu", 2500.00m, 10 },
                    { 61, "Hepsi", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Korna 12V", 350.00m, 60 },
                    { 62, "Hepsi", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Korna 24V", 400.00m, 40 },
                    { 63, "GOODYEAR", "Hepsi", "Hepsi", "Hepsi", 8, null, true, "Trafik Seti", 850.00m, 100 },
                    { 64, "BOSCH", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Akü Takviye Cihazı", 3200.00m, 15 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 64);
        }
    }
}
