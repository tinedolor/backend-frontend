using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Data;
using SchoolManagementAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public SubjectsController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

        // GET: api/Subjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(string id)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        // POST: api/Subjects
        [HttpPost]
        public async Task<ActionResult<Subject>> CreateSubject(Subject subject)
        {
            if (await _context.Subjects.AnyAsync(s => s.SubjectId == subject.SubjectId))
            {
                return Conflict($"Subject with ID {subject.SubjectId} already exists.");
            }

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubject), new { id = subject.SubjectId }, subject);
        }

        // PUT: api/Subjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(string id, Subject subject)
        {
            if (id != subject.SubjectId)
            {
                return BadRequest("ID in route doesn't match ID in body");
            }

            _context.Entry(subject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(string id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            // Check if subject has any sections before deleting
            var hasSections = await _context.Sections.AnyAsync(s => s.SubjectId == id);
            if (hasSections)
            {
                return BadRequest("Cannot delete subject because it has associated sections");
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubjectExists(string id)
        {
            return _context.Subjects.Any(e => e.SubjectId == id);
        }
    }
}