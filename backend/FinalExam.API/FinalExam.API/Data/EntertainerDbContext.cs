using System.Security.Cryptography.X509Certificates;
using FinalExam.API.Data;
using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class EntertainerDbContext : DbContext
    {
        public EntertainerDbContext(DbContextOptions<EntertainerDbContext> options) : base(options) 
        {
           
        }
        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }
    }
}
