using System;
using System.Collections.Generic;

namespace api.Models
{
    public class TicketReply
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public int? PersonId { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public Person Person { get; set; }
        public Ticket Ticket { get; set; }
    }
}