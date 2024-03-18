using System.ComponentModel.DataAnnotations;

namespace IAuthService.Models
{
    public class Query
    {

        [Key]
        public int QueryId { get; set; }
        public string UserName { get; set; }
        public string ClassName { get; set; }

        public string? StudentName {  get; set; }
        public string AskedQuery { get; set; } = string.Empty;
        public string QueryAnswer { get; set; } = string.Empty;
        public DateOnly QueryDate { get; set; } = new DateOnly();
        public TimeOnly QueryTime { get; set; }
        public bool IsAnswered { get; set; } = false;
    }
}
