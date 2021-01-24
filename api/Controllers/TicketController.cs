using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TicketController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<TicketDto>> GetTickets()
        {
            return await _context.Tickets
                .Include(t => t.Person)
                .Select(t => new TicketDto()
                {
                    TicketId = t.Id,
                    Title = t.Title,
                    Content = t.Content,
                    PostedOn = t.PostedOn,
                    PostedBy = t.Person.Name
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDto>> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Person)
                .Select(t => new TicketDto()
                {
                    TicketId = t.Id,
                    Title = t.Title,
                    Content = t.Content,
                    PostedOn = t.PostedOn,
                    PostedBy = t.Person.Name,
                    Replies = t.TicketReplies
                })
                .SingleOrDefaultAsync(t => t.TicketId == id);
            if (ticket is null)
            {
                return NotFound();
            }

            return ticket;
        }

        [Authorize] // requires authentication
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { ticket.Id }, ticket );
        }

        [Authorize] // requires authentication
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize] // requires authentication
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket is null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}