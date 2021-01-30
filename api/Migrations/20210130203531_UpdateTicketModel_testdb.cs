using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class UpdateTicketModel_testdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssigneeId",
                table: "Ticket",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_AssigneeId",
                table: "Ticket",
                column: "AssigneeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket",
                column: "AssigneeId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_AssigneeId",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Ticket");
        }
    }
}
