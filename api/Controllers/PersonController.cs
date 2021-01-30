using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/person")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public PersonController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            return await _context.Persons.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {

            var person = await _context.Persons.FindAsync(id);
            if (person is null)
            {
                return NotFound();
            }

            return person;
        }

        [HttpPost]
        public async Task<ActionResult<Person>> Register(Person person)
        {
            var user = new ApplicationUser
            {
                UserName = person.Name,
                Email = person.Email
            };
            var result = await _userManager.CreateAsync(user, person.Password);
            if (result.Succeeded)
            {
                _context.Persons.Add(person);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPerson", new { person.Id }, person);
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(int id)
        {
            var person = await _context.Persons.FindAsync(id);
            var user = await _userManager.FindByNameAsync(person.Name);
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                _context.Persons.Remove(person);
                await _context.SaveChangesAsync();
            }

            if (person is null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}