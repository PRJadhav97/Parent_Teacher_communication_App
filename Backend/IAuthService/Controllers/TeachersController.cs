using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IAuthService.Models;
using IAuthService.Models.RequestModels;
using IAuthService.Models.ResponseModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parrent_Teacher_Comm_app.Data;
using Parrent_Teacher_Comm_app.Models;

namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeachersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeacher_table()
        {
            return await _context.Teacher_table.ToListAsync();
        }

        [HttpGet("/getTeacherByClassname/{classname}")]
        public async Task<ActionResult<Teacher>> GetTeacherByClassname(string classname)
        {

            var teacher = await _context.Teacher_table.FirstOrDefaultAsync(a => a.ClassName == classname);
            if (teacher == null)
            {
                // If admin is not found, return NotFound
                return NotFound();
            }
            // If admin is found, return the admin object
            return teacher;
        }

        [HttpGet("getAllInActiveTeachers")]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetAllInActiveTeachers()
        {
            var teachers = await _context.Teacher_table
                .Where(teacher => teacher.isActive == 0)
            .ToListAsync();

            if (teachers == null)
            {
                // If admin is not found, return NotFound
                return NotFound();
            }
            // If admin is found, return the admin object
            return teachers;
        }


        [HttpGet("/getTeacherByEmail/{email}")]
        public async Task<ActionResult<Teacher>> GetTeacherByEmail(string email)
        {

            var teacher = await _context.Teacher_table.FirstOrDefaultAsync(a => a.TeacherEmail == email);
            if (teacher == null)
            {
                // If admin is not found, return NotFound
                return NotFound();
            }
            // If admin is found, return the admin object
            return teacher;
        }

        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherResponseModel>> GetTeacher(int id)
        {
            var teacher = await _context.Teacher_table.Include(t => t.Students).FirstAsync(s => s.TeacherId == id);

            if (teacher == null)
            {
                return NotFound();
            }
            TeacherResponseModel model = new TeacherResponseModel()
            {
                TeacherId = teacher.TeacherId,
                TeacherName = teacher.TeacherName,
                TeacherEmail = teacher.TeacherEmail,
                ClassName = teacher.ClassName,
                Students = teacher.Students
            };

            return model;
        }

        // PUT: api/Teachers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(int id,[FromForm] Teacher teacher)
        {
            
            if (id != teacher.TeacherId)
            {
                return BadRequest();
            }

            _context.Entry(teacher).State = EntityState.Modified;

            try
            {

                bool isInactive = string.Equals(teacher.ClassName, "substitute", StringComparison.OrdinalIgnoreCase);

                if (isInactive)
                {
                    teacher.isActive = 0;
                }
                else { teacher.isActive = 1; }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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

        [HttpPut("/update/{id}")]
        public async Task<IActionResult> PutTeacherforUpdate(int id, Teacher teacher)
        {
            if (id != teacher.TeacherId)
            {
                return BadRequest();
            }
            /*  var teacher_demo= await _context.PTC_Teacher_table.Where(t => t.TeacherId == teacher.TeacherId).FirstOrDefaultAsync();
              teacher.IsActive = teacher_demo.IsActive;*/

            /* teacher_demo.TeacherId = teacher.TeacherId;
             teacher_demo.TeacherName= teacher.TeacherName;
             teacher_demo.TeacherEmail= teacher.TeacherEmail;
             teacher_demo.TeacherPassword = teacher.TeacherPassword;
             teacher_demo.ClassName = teacher.ClassName;*/

            _context.Entry(teacher).State = EntityState.Modified;

            try
            {
                bool isInactive = string.Equals(teacher.ClassName, "substitute", StringComparison.OrdinalIgnoreCase);

                if (isInactive)
                {
                    teacher.isActive = 0;
                }
                else { teacher.isActive = 1; }
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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

        // POST: api/Teachers
        /*  [HttpPost]
          public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
          {
              _context.Teacher_table.Add(teacher);
              await _context.SaveChangesAsync();

              return CreatedAtAction("GetTeacher", new { id = teacher.TeacherId }, teacher);
          }*/

        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
        {
            bool isInactive = string.Equals(teacher.ClassName, "substitute", StringComparison.OrdinalIgnoreCase);

            if (isInactive)
            {
                teacher.isActive = 0;
            }
            else { teacher.isActive = 1; }

            _context.Teacher_table.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacher", new { id = teacher.TeacherId }, teacher);
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teacher_table.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teacher_table.Remove(teacher);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // PATCH: api/restoreTeacher/5
        [HttpPatch("/restoreTeacher/{newId}/{className}")]
        public async Task<IActionResult> RestoreTeacher(int newId, string className, [FromBody] JsonPatchDocument<Teacher> patchDoc)
        {
            try
            {
                //Get teacher id of teacher having className == given class name
                var existing_teacher = await _context.Teacher_table
                                    .Where(t => t.ClassName == className)
                                    .Select(teacher => teacher.TeacherId)
                                    .FirstOrDefaultAsync();
                //store the teacher id in variable of type int
                int oldId = existing_teacher;
                if (oldId == 0)
                { return NotFound(); }
                else
                {

                    await PatchTeacher(oldId, newId, className, patchDoc);
                    return Ok();
                }

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);


            }
        }





        // PATCH: api/replaceTeacher/5
        [HttpPatch("/replaceTeacher/{oldId}/{newId}/{className}")]
        public async Task<IActionResult> PatchTeacher(int oldId, int newId, string className, [FromBody] JsonPatchDocument<Teacher> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var replaceTeacher = await _context.Teacher_table.FindAsync(oldId);
            var newTeacher = await _context.Teacher_table.FindAsync(newId);

            if (replaceTeacher == null || newTeacher == null)
            {
                return NotFound();
            }

            //  _context.Entry(newTeacher).State = EntityState.Detached; // Detach the entity from the context

            patchDoc.ApplyTo(newTeacher, ModelState);// to change the className of new teacher

            // patchDoc.ApplyTo(replaceTeacher, ModelState);// to change the className of old teacher

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                replaceTeacher.isActive = 0;
                replaceTeacher.ClassName = "Substitute";
                newTeacher.isActive = 1;

                var studentsToUpdate = await _context.Student_table.Where(s => s.TeacherId == oldId).ToListAsync();

                foreach (var student in studentsToUpdate)
                {
                    student.TeacherId = newId;
                }


                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(oldId) || !TeacherExists(newId))
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



        private bool TeacherExists(int id)
        {
            return _context.Teacher_table.Any(e => e.TeacherId == id);
        }
    }
}
