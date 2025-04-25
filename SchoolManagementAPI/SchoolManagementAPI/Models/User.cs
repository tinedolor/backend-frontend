using Microsoft.AspNetCore.Identity;

namespace SchoolManagementAPI.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}