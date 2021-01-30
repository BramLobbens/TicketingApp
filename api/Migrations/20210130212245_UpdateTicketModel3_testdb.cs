using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class UpdateTicketModel3_testdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Person_PersonId",
                table: "Ticket");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket",
                column: "AssigneeId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Person_PersonId",
                table: "Ticket",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Person_PersonId",
                table: "Ticket");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Person_AssigneeId",
                table: "Ticket",
                column: "AssigneeId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Person_PersonId",
                table: "Ticket",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
