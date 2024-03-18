using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IAuthService.Migrations
{
    /// <inheritdoc />
    public partial class Table_Name_Change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_table_Parent_table_ParentId",
                table: "Student_table");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_table_Teacher_table_TeacherId",
                table: "Student_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teacher_table",
                table: "Teacher_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Student_table",
                table: "Student_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Query_table",
                table: "Query_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parent_table",
                table: "Parent_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Message_table",
                table: "Message_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Marks",
                table: "Marks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Announcements",
                table: "Announcements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Admin_table",
                table: "Admin_table");

            migrationBuilder.RenameTable(
                name: "Teacher_table",
                newName: "PTC_Teacher_table");

            migrationBuilder.RenameTable(
                name: "Student_table",
                newName: "PTC_Student_table");

            migrationBuilder.RenameTable(
                name: "Query_table",
                newName: "PTC_Query_table");

            migrationBuilder.RenameTable(
                name: "Parent_table",
                newName: "PTC_Parent_table");

            migrationBuilder.RenameTable(
                name: "Message_table",
                newName: "PTC_Message_table");

            migrationBuilder.RenameTable(
                name: "Marks",
                newName: "PTC_Marks");

            migrationBuilder.RenameTable(
                name: "Announcements",
                newName: "PTC_Announcements");

            migrationBuilder.RenameTable(
                name: "Admin_table",
                newName: "PTC_Admin_table");

            migrationBuilder.RenameIndex(
                name: "IX_Student_table_TeacherId",
                table: "PTC_Student_table",
                newName: "IX_PTC_Student_table_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_table_ParentId",
                table: "PTC_Student_table",
                newName: "IX_PTC_Student_table_ParentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Teacher_table",
                table: "PTC_Teacher_table",
                column: "TeacherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Student_table",
                table: "PTC_Student_table",
                column: "StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Query_table",
                table: "PTC_Query_table",
                column: "QueryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Parent_table",
                table: "PTC_Parent_table",
                column: "ParentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Message_table",
                table: "PTC_Message_table",
                column: "MessageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Marks",
                table: "PTC_Marks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Announcements",
                table: "PTC_Announcements",
                column: "AnnouncementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PTC_Admin_table",
                table: "PTC_Admin_table",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_PTC_Student_table_PTC_Parent_table_ParentId",
                table: "PTC_Student_table",
                column: "ParentId",
                principalTable: "PTC_Parent_table",
                principalColumn: "ParentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PTC_Student_table_PTC_Teacher_table_TeacherId",
                table: "PTC_Student_table",
                column: "TeacherId",
                principalTable: "PTC_Teacher_table",
                principalColumn: "TeacherId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PTC_Student_table_PTC_Parent_table_ParentId",
                table: "PTC_Student_table");

            migrationBuilder.DropForeignKey(
                name: "FK_PTC_Student_table_PTC_Teacher_table_TeacherId",
                table: "PTC_Student_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Teacher_table",
                table: "PTC_Teacher_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Student_table",
                table: "PTC_Student_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Query_table",
                table: "PTC_Query_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Parent_table",
                table: "PTC_Parent_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Message_table",
                table: "PTC_Message_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Marks",
                table: "PTC_Marks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Announcements",
                table: "PTC_Announcements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PTC_Admin_table",
                table: "PTC_Admin_table");

            migrationBuilder.RenameTable(
                name: "PTC_Teacher_table",
                newName: "Teacher_table");

            migrationBuilder.RenameTable(
                name: "PTC_Student_table",
                newName: "Student_table");

            migrationBuilder.RenameTable(
                name: "PTC_Query_table",
                newName: "Query_table");

            migrationBuilder.RenameTable(
                name: "PTC_Parent_table",
                newName: "Parent_table");

            migrationBuilder.RenameTable(
                name: "PTC_Message_table",
                newName: "Message_table");

            migrationBuilder.RenameTable(
                name: "PTC_Marks",
                newName: "Marks");

            migrationBuilder.RenameTable(
                name: "PTC_Announcements",
                newName: "Announcements");

            migrationBuilder.RenameTable(
                name: "PTC_Admin_table",
                newName: "Admin_table");

            migrationBuilder.RenameIndex(
                name: "IX_PTC_Student_table_TeacherId",
                table: "Student_table",
                newName: "IX_Student_table_TeacherId");

            migrationBuilder.RenameIndex(
                name: "IX_PTC_Student_table_ParentId",
                table: "Student_table",
                newName: "IX_Student_table_ParentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teacher_table",
                table: "Teacher_table",
                column: "TeacherId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student_table",
                table: "Student_table",
                column: "StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Query_table",
                table: "Query_table",
                column: "QueryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parent_table",
                table: "Parent_table",
                column: "ParentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Message_table",
                table: "Message_table",
                column: "MessageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Marks",
                table: "Marks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Announcements",
                table: "Announcements",
                column: "AnnouncementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Admin_table",
                table: "Admin_table",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_table_Parent_table_ParentId",
                table: "Student_table",
                column: "ParentId",
                principalTable: "Parent_table",
                principalColumn: "ParentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_table_Teacher_table_TeacherId",
                table: "Student_table",
                column: "TeacherId",
                principalTable: "Teacher_table",
                principalColumn: "TeacherId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
