using Parrent_Teacher_Comm_app.Models;

namespace IAuthService.Models.ResponseModels
{
    public class ParentResponseModel
    {
        public int ParentId { get; set; }
        public string? ParentName { get; set; }
        public string? ParentEmail { get; set; }
        public ICollection<Student>? Students { get; set; }  
    }
}
