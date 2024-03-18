namespace AnniuncementPortal2.Models.RequestModels
{

    public class AnnouncementRequestModel
    {
        public string AnnouncementDescription { get; set; }
        public string AnnouncementTitle { get; set; }
        public string ClassName { get; set; }
        public int TeacherId { get; set; } = 0;
        /*  public DateOnly AnnouncementDate { get; set; } = new DateOnly();
          public TimeOnly AnnouncementTime { get; set; }*/
    }

}
