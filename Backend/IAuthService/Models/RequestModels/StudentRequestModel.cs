using Parrent_Teacher_Comm_app.Models;

namespace IAuthService.Models.RequestModels
{
    public class StudentRequestModel
    {
        public int StudentId { get; set; }
        public string? StudentName { get; set; }
        public int ParentId { get; set; }
        /*public Parent? Parent_ { get; set; }  */

        public Parent? Parent_ { get; set; }


        public string? ClassName { get; set; }
    }
}
