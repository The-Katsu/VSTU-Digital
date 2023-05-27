using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSTU.Digital.Messenger.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class chat_creator : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "creator_id",
                table: "chats",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_chats_creator_id",
                table: "chats",
                column: "creator_id");

            migrationBuilder.AddForeignKey(
                name: "fk_chats_users_creator_id",
                table: "chats",
                column: "creator_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_chats_users_creator_id",
                table: "chats");

            migrationBuilder.DropIndex(
                name: "ix_chats_creator_id",
                table: "chats");

            migrationBuilder.DropColumn(
                name: "creator_id",
                table: "chats");
        }
    }
}
