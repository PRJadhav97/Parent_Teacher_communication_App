using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IAuthService.Models.RequestModels;
using IAuthService.Models.ResponseModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parrent_Teacher_Comm_app.Data;
using Parrent_Teacher_Comm_app.Models;
using static Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions;

namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ParentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Parents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parent>>> GetParent_table()
        {
            return await _context.Parent_table.Include(p => p.Students).ToListAsync();
        }

        // GET: api/Parents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ParentResponseModel>> GetParent(int id)
        {
            // var parent = await _context.Parent_table.Include(p=>p.Students).FirstAsync(x=>x.ParentId==id);
            var parent = await _context.Parent_table
                        .Include(p => p.Students)
                        .ThenInclude(s => s.Teacher_)
                        .FirstAsync(x => x.ParentId == id);



            if (parent == null)
            {
                return NotFound();
            }
            ParentResponseModel model = new ParentResponseModel()
            {
                ParentId = parent.ParentId,
                ParentName = parent.ParentName,
                ParentEmail = parent.ParentEmail,
                Students = parent.Students
            };
            return model;
        }
        // new

        [HttpGet("/getParentByEmail/{email}")]
        public async Task<ActionResult<Parent>> GetParentByEmail(string email)
        {
            var parent = await _context.Parent_table.Include(p => p.Students).FirstAsync(x => x.ParentEmail == email);

            if (parent == null)
            {
                return NotFound();
            }

            return parent;
        }

        // PUT: api/Parents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParent(int id, [FromForm] Parent parent)
        {
            if (id != parent.ParentId)
            {
                return BadRequest();
            }

            _context.Entry(parent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParentExists(id))
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

        [HttpPut("/updateParent/{id}")]
        public async Task<IActionResult> UpdateParent(int id, Parent parent)
        {
            if (id != parent.ParentId)
            {
                return BadRequest();
            }

            _context.Entry(parent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParentExists(id))
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
        //==================================================================================================================
        // POST: api/Parents
        [HttpPost]
        public async Task<ActionResult<Parent>> PostParent(Parent p)
        {/*
            TryValidateModel(model);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            /*Parent p = new Parent
            {
                Name = model.Name,
                Email = model.Email, 
                Password = model.Password,
                Students = (ICollection<Student>?)model.Students

            };*/
            _context.Parent_table.Add(p);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParent", new { id = p.ParentId }, p);
        }

        // DELETE: api/Parents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParent(int id)
        {
            var parent = await _context.Parent_table.FindAsync(id);
            if (parent == null)
            {
                return NotFound();
            }

            _context.Parent_table.Remove(parent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParentExists(int id)
        {
            return _context.Parent_table.Any(e => e.ParentId == id);
        }
    }
}
