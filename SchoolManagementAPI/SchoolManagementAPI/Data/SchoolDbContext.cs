using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Models;

namespace SchoolManagementAPI.Data
{
    public class SchoolDbContext : IdentityDbContext<User>
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<StudentSection> StudentSections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure StudentSection as a join table with composite key
            modelBuilder.Entity<StudentSection>()
                .HasKey(ss => new { ss.StudentId, ss.SectionId });

            modelBuilder.Entity<StudentSection>()
                .HasOne(ss => ss.Student)
                .WithMany()
                .HasForeignKey(ss => ss.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StudentSection>()
                .HasOne(ss => ss.Section)
                .WithMany()
                .HasForeignKey(ss => ss.SectionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Other configurations...
        }
    }
}