using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(
                user =>
                {
                    user.Property(e => e.Name).IsRequired();
                    user.ToTable("User"); // Conform to singular table name convention
                }
            );

            modelBuilder.Entity<Ticket>(
                ticket =>
                {
                    ticket.Property(e => e.Title).IsRequired();
                    ticket.Property(e => e.PostedOn).IsRequired();
                    ticket.ToTable("Ticket"); // Conform to singular table name convention
                }
            );
        }
    }
}