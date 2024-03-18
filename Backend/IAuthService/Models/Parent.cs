using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Parrent_Teacher_Comm_app.Models
{
    public class Parent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ParentId { get; set; }
        public string? ParentName { get; set; }
        public string? ParentEmail { get; set; }
        public string? ParentPassword { get; set; }
        public ICollection<Student>? Students { get; set; } 
    }
}
