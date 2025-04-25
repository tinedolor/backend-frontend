using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.Models
{
    public class Section
    {
        public string SectionID { get; set; }
        public string SectionName { get; set; }

        // Foreign key
        public string SubjectId { get; set; }

        // Navigation property
        public Subject Subject { get; set; }
    }
}