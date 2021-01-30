using System.Collections.Generic;

namespace api.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public string Password { get; set; }
        public string Email { get; set; }
        public ICollection<Ticket> IssuedTickets { get; set; }
        public ICollection<Ticket> AssignedTickets { get; set; }
        public ICollection<TicketReply> TicketReplies { get; set; }
    }
}