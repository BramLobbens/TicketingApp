using System.Collections.Generic;

namespace api.Models
{
    public class User
    {
        public User(string name)
        {
            Name = name;
        }
        public int Id { get; set; }
        public string Name { get; }
        public ICollection<Ticket> Tickets { get; } = new List<Ticket>();
    }
}