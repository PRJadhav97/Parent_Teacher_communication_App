using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IAuthService.Models;
using Parrent_Teacher_Comm_app.Data;
using IAuthService.Models.ResponseModels;

namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmin_table()
        {
            return await _context.Admin_table.ToListAsync();
        }

        [HttpGet("/getAdminByEmail/{email}")]
        public async Task<ActionResult<Admin>> GetAdminByEmail(string email)
        {
            
            var admin = await _context.Admin_table.FirstOrDefaultAsync(a => a.AdminEmail == email);
            if (admin == null)
            {
                // If admin is not found, return NotFound
                return NotFound();
            }
            // If admin is found, return the admin object
            return admin;
        }


        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminResponseModel>> GetAdmin(int id)
        {
            var admin = await _context.Admin_table.FindAsync(id);
           
            if (admin == null)
            {
                return NotFound();
            }
            AdminResponseModel model = new AdminResponseModel()
            {
                AdminId = admin.AdminId,
                AdminName = admin.AdminName,
                AdminEmail = admin.AdminEmail,
            };

            return model;
        }

        // PUT: api/Admins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(int id, [FromForm] Admin admin)
        {
            if (id != admin.AdminId)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // POST: api/Admins
        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
            _context.Admin_table.Add(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmin", new { id = admin.AdminId }, admin);
        }

        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.Admin_table.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.Admin_table.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminExists(int id)
        {
            return _context.Admin_table.Any(e => e.AdminId == id);
        }
    }
}
