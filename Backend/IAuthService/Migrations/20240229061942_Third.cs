using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IAuthService.Migrations
{
    /// <inheritdoc />
    public partial class Third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "MessageDate",
                table: "Message_table",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "MessageTime",
                table: "Message_table",
                type: "time",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessageDate",
                table: "Message_table");

            migrationBuilder.DropColumn(
                name: "MessageTime",
                table: "Message_table");
        }
    }
}
