using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace api.Controllers
{
    [Produces("application/json")]

    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;

        public AuthenticateController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
            _context = context;
        }

        [Route("api/signin")]
        [HttpPost]
        public async Task<ActionResult> Signin(Person person)
        {
            var user = await _userManager.FindByNameAsync(person.Name);
            int personId;

            if (user != null && await _userManager.CheckPasswordAsync(user, person.Password))
            {
                var authClaims = new []
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    expires: DateTime.Now.AddMinutes(60),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                Response.Cookies.Append("access_token", tokenString, new CookieOptions { IsEssential = true });

                // Get PersonId
                personId = _context.Persons.Where(p => p.Name == person.Name).Select(p => p.Id).SingleOrDefault();

                return Ok(new
                {
                    userId = personId,
                    userName = person.Name,
                });
            }
            return Unauthorized();
        }

        [Route("api/signout")]
        [HttpGet]
        public ActionResult Signout()
        {
            if (Request.Cookies.ContainsKey("access_token"))
            {
                Response.Cookies.Delete("access_token");
                return Ok();
            }
            return BadRequest();
        }
    }
}