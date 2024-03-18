using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using IAuthService.Models.RequestModels;

namespace Parrent_Teacher_Comm_app.Models
{
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StudentId { get; set; }
        public string? StudentName { get; set; }
        public string? ClassName { get; set; }

        public int ParentId { get; set; }
        public int TeacherId { get; set; }

        [ForeignKey("ParentId")]
        public Parent? Parent_ { get; set; }
        [ForeignKey("TeacherId")]
        public Teacher? Teacher_ { get; set; }
    }
}
