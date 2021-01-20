using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // required for identity set-up

            modelBuilder.Entity<Person>(
                person =>
                {
                    person.Property(p => p.Name)
                        .IsRequired()
                        .HasMaxLength(256); // Set max nvarchar to be performant on indexing
                    person.Ignore(p => p.Password); // Do not map password to Person table
                    person.HasMany(p => p.Tickets);
                    person.ToTable("Person"); // Conform to singular table name convention
                }
            );

            modelBuilder.Entity<Ticket>(
                ticket =>
                {
                    ticket.Property(t => t.Title)
                        .IsRequired()
                        .HasMaxLength(256); // Set max nvarchar to be performant on indexing
                    ticket.Property(t => t.PostedOn)
                        .IsRequired();
                    ticket.HasOne(t => t.Person)
                        .WithMany(p => p.Tickets)
                        .HasForeignKey(t => t.PersonId);
                    ticket.ToTable("Ticket"); // Conform to singular table name convention
                }
            );
        }
    }
}