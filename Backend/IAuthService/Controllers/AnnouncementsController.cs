using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnniuncementPortal2.Models;
using AnniuncementPortal2.Models.RequestModels;
using Parrent_Teacher_Comm_app.Data;
using Parrent_Teacher_Comm_app.Models;

namespace AnniuncementPortal2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnnouncementsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Announcements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements()
        {
            return await _context.Announcements.ToListAsync();
        }

        // GET: api/Announcements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);

            if (announcement == null)
            {
                return NotFound();
            }

            return announcement;
        }


        [HttpGet("/getAnnByClassname/{clName}")]
        public async Task<ActionResult<Announcement>> GetAnnByClass(string clName)
        {

            var ann = await _context.Announcements.FromSqlInterpolated($"select AnnouncementId, AnnouncementTitle, AnnouncementDescription,AnnouncementTime, AnnouncementDate, ClassName, TeacherId from Announcements where ClassName = {clName}")
                .ToListAsync();
            if (ann == null)
            {
                // If admin is not found, return NotFound
                return NotFound();
            }
            // If admin is found, return the admin object
            return Ok(ann);
        }

        // PUT: api/Announcements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnnouncement(int id, Announcement announcement)
        {
            if (id != announcement.AnnouncementId)
            {
                return BadRequest();
            }

            _context.Entry(announcement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnnouncementExists(id))
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


        // POST: api/Announcements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost]
        public async Task<ActionResult<AnnouncementRequestModel>> PostAnnouncement(AnnouncementRequestModel announcementReq)
        {
            var announcementpoco = new Announcement
            {
                AnnouncementDescription = announcementReq.AnnouncementDescription,
                AnnouncementDate = DateOnly.FromDateTime(DateTime.Now),
                AnnouncementTime = TimeOnly.FromDateTime(DateTime.Now),
                AnnouncementTitle = announcementReq.AnnouncementTitle,
                ClassName = announcementReq.ClassName,
                TeacherId = announcementReq.TeacherId


            };
            _context.Announcements.Add(announcementpoco);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnnouncement", new { id = announcementReq.AnnouncementTitle }, announcementReq);
        }

        // DELETE: api/Announcements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
            {
                return NotFound();
            }

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnnouncementExists(int id)
        {
            return _context.Announcements.Any(e => e.AnnouncementId == id);
        }
    }
}
