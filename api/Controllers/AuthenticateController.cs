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
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/signin")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public AuthenticateController(UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        [HttpPost]
        public async Task<ActionResult> Signin(Person person)
        {
            var user = await _userManager.FindByNameAsync(person.Name);
            if (user != null && await _userManager.CheckPasswordAsync(user, person.Password))
            {
                // var claims = new List<Claim>
                // {
                //     new Claim(ClaimTypes.Name, Guid.NewGuid().ToString())
                // };

                // var claimsIdentity = new ClaimsIdentity(
                // claims, CookieAuthenticationDefaults.AuthenticationScheme);
                // var authProperties = new AuthenticationProperties();

                // await HttpContext.SignInAsync(
                //     CookieAuthenticationDefaults.AuthenticationScheme,
                //     new ClaimsPrincipal(claimsIdentity),
                //     authProperties);

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

                Response.Cookies.Append("token", tokenString);

                return Ok(new
                {
                    token = tokenString,
                    expiration = token.ValidTo
                });
                // return Ok();
            }
            return Unauthorized();
        }
    }
}