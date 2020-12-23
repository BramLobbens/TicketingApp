using System;

namespace api.Models
{
    public class TicketDto
    {
        public int TicketId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public string PostedBy { get; set; }
    }
}