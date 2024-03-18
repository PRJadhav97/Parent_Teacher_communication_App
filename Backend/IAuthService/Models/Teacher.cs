using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Parrent_Teacher_Comm_app.Models
{
    public class Teacher
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TeacherId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherEmail { get; set; }
        public string? TeacherPassword { get; set; }
        public string? ClassName { get; set; }

        public int? isActive { get; set; } 


        public ICollection<Student>? Students { get; set; }

    }
}
