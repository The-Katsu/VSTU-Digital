using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSTU.Digital.Messenger.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class groups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 9999);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "first_name", "group_name", "last_name", "password", "patronymic", "role_id", "username" },
                values: new object[] { 9999, "admin", "admin", "admin", "!1AdMiN0?", "admin", 1, "admin" });
        }
    }
}
