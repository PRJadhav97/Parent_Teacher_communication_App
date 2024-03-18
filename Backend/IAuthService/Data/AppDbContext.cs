using AnniuncementPortal2.Models;
using IAuthService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Parrent_Teacher_Comm_app.Models;

namespace Parrent_Teacher_Comm_app.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Parent> Parent_table { get; set; } 
        public DbSet<Student> Student_table { get; set; }
        public DbSet<Teacher> Teacher_table { get; set; }
        public DbSet<Admin> Admin_table { get;set; }

        public DbSet<Query> Query_table { get; set; }


        public DbSet<Announcement> Announcements { get; set; }

        public DbSet<Marks> Marks { get; set; }

        public DbSet<Messages> Message_table { get; set; }


    }
}
