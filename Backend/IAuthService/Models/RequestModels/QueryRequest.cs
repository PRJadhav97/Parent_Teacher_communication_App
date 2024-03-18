namespace IAuthService.Models.RequestModels
{
    public class QueryRequest
    {

        public string UserName { get; set; }
        public string ClassName { get; set; }
        public string AskedQuery { get; set; } = string.Empty;

        public string? StudentName { get; set; }

    }
}
