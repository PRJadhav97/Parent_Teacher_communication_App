namespace IAuthService.Models
{
    public class Marks
    {
        public int Id {  get; set; }

        public int StudentId { get; set; }

        public string? StudentName { get; set; }

        public string? ClassName { get; set; }

        public int Maths { get; set; }
        public int Physics { get; set; }

        public int Chemistry { get; set; }

        public int History { get; set; }
      

    }
}
