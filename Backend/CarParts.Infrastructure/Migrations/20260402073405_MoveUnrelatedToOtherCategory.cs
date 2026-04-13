using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarParts.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MoveUnrelatedToOtherCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CarEngine", "CarMake", "CarModel", "CategoryId", "ImageUrl", "IsFeatured", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 65, "Continental", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Continental Lastik 205/55 R16", 2450.00m, 40 },
                    { 66, "Hepsi", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Kriko Seti 2 Ton", 1250.00m, 20 },
                    { 67, "Hepsi", "Hepsi", "Hepsi", "Hepsi", 8, null, false, "Yangın Söndürme Tüpü 2kg", 450.00m, 100 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 67);
        }
    }
}
