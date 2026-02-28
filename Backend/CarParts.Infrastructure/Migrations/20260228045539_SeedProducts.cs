using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarParts.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CategoryId", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Bosch", 1, "Bosch 4 Tırnak Buji Seti", 450.00m, 50 },
                    { 2, "Brembo", 2, "Brembo Ön Fren Balatası", 1250.00m, 30 },
                    { 3, "Monroe", 3, "Monroe Arka Amortisör", 2100.00m, 15 },
                    { 4, "Osram", 4, "Osram Night Breaker H7 Ampul", 650.00m, 100 },
                    { 5, "Castrol", 1, "Castrol Edge 5W-30 Motor Yağı (4L)", 1100.00m, 80 },
                    { 6, "TRW", 2, "TRW Fren Diski Ön", 1850.00m, 20 },
                    { 7, "Varta", 4, "Varta 72 Amper Akü", 3200.00m, 10 },
                    { 8, "KYB", 3, "KYB Ön Helezon Yayı", 850.00m, 25 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
