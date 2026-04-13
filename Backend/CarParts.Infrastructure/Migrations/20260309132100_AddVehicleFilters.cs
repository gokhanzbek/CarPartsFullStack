using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarParts.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleFilters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarEngine",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarMake",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarModel",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "2.0", "BMW", "3 Serisi" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "1.8 TFSI", "Audi", "A4" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "1.6", "Mercedes", "C Serisi" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "1.4 TSI", "Volkswagen", "Golf" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "2.0d", "BMW", "5 Serisi" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "2.0 TDI", "Audi", "A6" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "2.0", "Mercedes", "E Serisi" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CarEngine", "CarMake", "CarModel" },
                values: new object[] { "1.6 TDI", "Volkswagen", "Passat" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "CarEngine", "CarMake", "CarModel", "CategoryId", "IsFeatured", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 9, "Mann", "1.6", "BMW", "3 Serisi", 1, true, "Mann Hava Filtresi", 350.00m, 100 },
                    { 10, "Bosch", "2.0 TDI", "Audi", "A4", 4, false, "Bosch Silecek Takımı", 400.00m, 60 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DropColumn(
                name: "CarEngine",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CarMake",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CarModel",
                table: "Products");
        }
    }
}
