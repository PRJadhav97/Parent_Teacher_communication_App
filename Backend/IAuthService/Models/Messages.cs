using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IAuthService.Models
{
    public class Messages
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MessageId { get; set; }
        public string? Message { get; set; }
        public int ParentId { get; set; }
        public int TeacherId { get; set; }
        public string Role { get; set; }

        public DateOnly? MessageDate { get; set; } = new DateOnly();
        public TimeOnly? MessageTime { get; set; }
    }
}
