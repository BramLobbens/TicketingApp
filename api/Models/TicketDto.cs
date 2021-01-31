using System;
using System.Collections.Generic;

namespace api.Models
{
    public class TicketDto
    {
        public int TicketId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public string PostedBy { get; set; }
        public string AssignedTo { get; set; }
        public string Status { get; set; }
        public ICollection<TicketReply> Replies { get; set; }
    }
}