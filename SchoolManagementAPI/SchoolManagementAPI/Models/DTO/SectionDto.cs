/* namespace SchoolManagementAPI.Models.DTO
{
    public class SectionDto
    {
        public int SectionId { get; set; }
        public string Name { get; set; }
        public List<string> StudentNames { get; set; }

        public static SectionDto FromEntity(Section section)
        {
            return new SectionDto
            {
                SectionId = section.SectionId,
                Name = section.names,
                StudentNames = section.StudentSection?
                    .Select(ss => ss.Student?.FullName)
                    .ToList()
            };
        }
    }
}
*/