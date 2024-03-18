using System.ComponentModel.DataAnnotations;

namespace AnniuncementPortal2.Models
{

    public class Announcement
    {
        [Key]
        public int AnnouncementId { get; set; }
        public string AnnouncementTitle { get; set; }
        public string AnnouncementDescription { get; set; }
        public DateOnly AnnouncementDate { get; set; } = new DateOnly();
        public TimeOnly AnnouncementTime { get; set; }
        public string ClassName { get; set; }
        public int TeacherId { get; set; }

    }
}
