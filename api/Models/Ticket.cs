using System;

namespace api.Models
{
    public class Ticket
    {
        public Ticket(string title, DateTime postedOn)
        {
            Title = title;
            PostedOn = postedOn;
        }
        public int Id { get; set; }
        public string Title { get; }
        public string Content { get; set; }
        public DateTime PostedOn { get; }
        public User User { get; set; }
    }
}