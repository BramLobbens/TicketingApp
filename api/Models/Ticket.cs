using System;
using System.Collections.Generic;

namespace api.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public Person Person { get; set; }
        public ICollection<TicketReply> TicketReplies { get; set; }
    }
}