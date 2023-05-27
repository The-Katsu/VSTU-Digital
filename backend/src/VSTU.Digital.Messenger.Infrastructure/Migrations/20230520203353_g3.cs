using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSTU.Digital.Messenger.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class g3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_groups_chats_chat_id",
                table: "groups");

            migrationBuilder.DropIndex(
                name: "ix_groups_chat_id",
                table: "groups");

            migrationBuilder.DropColumn(
                name: "chat_id",
                table: "groups");

            migrationBuilder.CreateTable(
                name: "chat_group",
                columns: table => new
                {
                    chats_id = table.Column<int>(type: "integer", nullable: false),
                    groups_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_chat_group", x => new { x.chats_id, x.groups_id });
                    table.ForeignKey(
                        name: "fk_chat_group_chats_chats_id",
                        column: x => x.chats_id,
                        principalTable: "chats",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_chat_group_groups_groups_id",
                        column: x => x.groups_id,
                        principalTable: "groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_chat_group_groups_id",
                table: "chat_group",
                column: "groups_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chat_group");

            migrationBuilder.AddColumn<int>(
                name: "chat_id",
                table: "groups",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_groups_chat_id",
                table: "groups",
                column: "chat_id");

            migrationBuilder.AddForeignKey(
                name: "fk_groups_chats_chat_id",
                table: "groups",
                column: "chat_id",
                principalTable: "chats",
                principalColumn: "id");
        }
    }
}
