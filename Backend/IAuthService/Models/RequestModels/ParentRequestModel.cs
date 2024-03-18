using Parrent_Teacher_Comm_app.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IAuthService.Models.RequestModels
{
    public class ParentRequestModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public ICollection<StudentRequestModel>? Students { get; set; }
    }
}
