namespace SchoolManagementAPI.Models
{
    public class StudentSection
    {
        public string StudentId { get; set; }
        public Student Student { get; set; }

        public string SectionId { get; set; }
        public Section Section { get; set; }
    }
}