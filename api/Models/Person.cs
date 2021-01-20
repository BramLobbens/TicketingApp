using System.Collections.Generic;

namespace api.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public string Password { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}