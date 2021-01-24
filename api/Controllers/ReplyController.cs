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
    [Route("api/ticket/reply")]
    [ApiController]
    public class ReplyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReplyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<TicketDto>> GetTicketReplies()
        {
            return await _context.Replies
                .Include(r => r.Person)
                .Include(r => r.Ticket)
                .Select(r => new TicketDto()
                {
                    TicketId = r.Id,
                    Content = r.Content,
                    PostedOn = r.PostedOn,
                    PostedBy = r.Person.Name
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDto>> GetTicketReply(int id)
        {
            var ticketReply = await _context.Replies
                .Include(r => r.Person)
                .Include(r => r.Ticket)
                .Select(r => new TicketDto()
                {
                    TicketId = r.Id,
                    Content = r.Content,
                    PostedOn = r.PostedOn,
                    PostedBy = r.Person.Name
                })
                .SingleOrDefaultAsync(t => t.TicketId == id);
            if (ticketReply is null)
            {
                return NotFound();
            }

            return ticketReply;
        }

        //[Authorize] // requires authentication
        [HttpPost]
        public async Task<ActionResult<TicketReply>> PostTicket(TicketReply reply)
        {
            // Check if Principal Ticket exists
            var ticket = await _context.Tickets.FindAsync(reply.TicketId);
            if (ticket == null)
            {
                return BadRequest();
            }
            _context.Replies.Add(reply);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketReply", new { reply.Id }, reply );
        }

        [Authorize] // requires authentication
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TicketReply reply)
        {
            if (id != reply.Id)
            {
                return BadRequest();
            }

            _context.Entry(reply).State = EntityState.Modified;
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
            var ticketReply = await _context.Tickets.FindAsync(id);

            if (ticketReply is null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticketReply);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}