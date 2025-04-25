using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.Data;
using SchoolManagementAPI.Models;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public SectionsController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/Sections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSections()
        {
            return await _context.Sections
                .Select(s => new
                {
                    s.SectionID,
                    s.SectionName
                })
                .ToListAsync();
        }

        // GET: api/Sections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetSection(string id)
        {
            var section = await _context.Sections
                .Where(s => s.SectionID == id)
                .Select(s => new
                {
                    s.SectionID,
                    s.SectionName
                })
                .FirstOrDefaultAsync();

            if (section == null)
            {
                return NotFound();
            }

            return section;
        }

        // POST: api/Sections
        [HttpPost]
        public async Task<ActionResult<Section>> PostSection(Section section)
        {
            if (string.IsNullOrWhiteSpace(section.SectionID))
            {
                return BadRequest("SectionID is required.");
            }

            if (await _context.Sections.AnyAsync(s => s.SectionID == section.SectionID))
            {
                return Conflict("Section with this ID already exists.");
            }

            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSection), new { id = section.SectionID }, section);
        }

        // PUT: api/Sections/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSection(string id, Section section)
        {
            if (id != section.SectionID)
            {
                return BadRequest("ID mismatch");
            }

            _context.Entry(section).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SectionExists(id))
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

        // DELETE: api/Sections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(string id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                return NotFound();
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SectionExists(string id)
        {
            return _context.Sections.Any(e => e.SectionID == id);
        }
    }
}