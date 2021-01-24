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
        public DbSet<TicketReply> Replies { get; set; }

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
                    person.Property(p => p.Email)
                        .IsRequired()
                        .HasMaxLength(256); // Set max nvarchar to be performant on indexing
                    person.Ignore(p => p.Password); // Do not map password to Person table
                    person.HasMany(p => p.Tickets);
                    person.HasMany(p => p.TicketReplies);
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
                    ticket.HasMany(t => t.TicketReplies);
                    ticket.ToTable("Ticket"); // Conform to singular table name convention
                }
            );

            modelBuilder.Entity<TicketReply>(
                reply =>
                {
                    reply.Property(r => r.PostedOn)
                        .IsRequired();
                    reply.HasOne(r => r.Person)
                        .WithMany(p => p.TicketReplies)
                        .HasForeignKey(r => r.PersonId)
                        .OnDelete(DeleteBehavior.SetNull); // Allow Person FK to be set null on delete Person to keep cascade constraint with Ticket
                    reply.HasOne(r => r.Ticket)
                        .WithMany(t => t.TicketReplies)
                        .HasForeignKey(r => r.TicketId)
                        .OnDelete(DeleteBehavior.ClientCascade); // Set to ClientCascade due to EF migrations
                    reply.ToTable("TicketReply"); // Conform to singular table name convention
                }
            );
        }
    }
}