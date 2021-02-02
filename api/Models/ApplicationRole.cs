using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        {}

        public ApplicationRole(string roleName) : base(roleName)
        {

        }
    }
}