namespace SchoolManagementAPI.Models
{
    public class Subject
    {
        public string SubjectId { get; set; }
        public string Code { get; set; }
        public string Descriptions { get; set; }
        public string Room { get; set; }

        // Navigation property for sections
        public ICollection<Section> Sections { get; set; }
    }
}
