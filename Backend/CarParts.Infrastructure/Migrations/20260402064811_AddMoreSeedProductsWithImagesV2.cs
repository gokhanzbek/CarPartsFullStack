using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarParts.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreSeedProductsWithImagesV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CarEngine", "CarMake", "CarModel", "CategoryId", "ImageUrl", "IsFeatured", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 21, "Audi Genuine", "1.8 TFSI", "Audi", "A4", 1, "/images/products/055c217b-83a7-4d9e-8b4f-5cba7d064f95.png", false, "Audi A4 1.8 TFSI Turbo Şarj Ünitesi", 24500.00m, 5 },
                    { 22, "Febi", "1.8 TFSI", "Audi", "A4", 1, "/images/products/0d4c4ffe-6832-4319-97ec-4274e88b439a.png", false, "Audi A4 1.8 TFSI Yağ Pompası", 3200.00m, 12 },
                    { 23, "NGK", "1.8 TFSI", "Audi", "A4", 1, "/images/products/0e65670d-b597-4ea5-9dc0-78cf57ff09b4.png", false, "Audi A4 1.8 TFSI Ateşleme Bobini", 1150.00m, 40 },
                    { 24, "BMW Genuine", "2.0", "BMW", "3 Serisi", 1, "/images/products/25a236b7-a9e8-45de-be5d-80f93d280820.png", false, "BMW 3 Serisi 2.0 Eksantrik Mili Sensörü", 2850.00m, 15 },
                    { 25, "Behr", "2.0", "BMW", "3 Serisi", 1, "/images/products/273806d1-ca41-4d82-8a80-cb551f584af9.png", false, "BMW 3 Serisi 2.0 Su Radyatörü", 5400.00m, 8 },
                    { 26, "Sachs", "2.0", "BMW", "3 Serisi", 1, "/images/products/34a1403a-979a-4d7c-ba0b-7f9ec3f17d5a.png", false, "BMW 3 Serisi 2.0 Debriyaj Seti", 8900.00m, 6 },
                    { 27, "Continental", "1.4 TSI", "Volkswagen", "Golf", 1, "/images/products/54c25b60-d2d6-4a9b-b993-3c1ca2f6f882.png", false, "VW Golf 1.4 TSI Triger Kayışı Seti", 4200.00m, 20 },
                    { 28, "Bosch", "1.4 TSI", "Volkswagen", "Golf", 1, "/images/products/5e4b4065-31d0-4bc7-be75-ce2aa9895e4a.png", false, "VW Golf 1.4 TSI Yakıt Enjektörü", 3100.00m, 24 },
                    { 30, "Mahle", "1.4 TSI", "Volkswagen", "Golf", 1, "/images/products/6a71e24a-7681-4b0e-bbe0-ac3a113f12b0.png", false, "VW Golf 1.4 TSI Termostat Gövdesi", 1850.00m, 15 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30);
        }
    }
}
