namespace IAuthService.Models.RequestModels
{
    public class MessagesRequestModel
    {
        public string? Message { get; set; }
        public int ParentId { get; set; }
        public int TeacherId { get; set; }
        public string Role { get; set; }
    }
}
