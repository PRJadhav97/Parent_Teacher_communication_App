using Parrent_Teacher_Comm_app.Models;

namespace IAuthService.Models.ResponseModels
{
    public class TeacherResponseModel
    {
        public int TeacherId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherEmail { get; set; }
        public string? ClassName { get; set; }

        public ICollection<Student>? Students { get; set; }
    }
}
