using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IAuthService.Models;
using IAuthService.Models.RequestModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parrent_Teacher_Comm_app.Data;
using Parrent_Teacher_Comm_app.Models;

namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudent_table()
        {
            return await _context.Student_table.Include("Parent_").ToListAsync();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Student_table.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            Parent p = await _context.Parent_table.FirstOrDefaultAsync(p => p.ParentId == student.ParentId);
            Teacher t = await _context.Teacher_table.FirstOrDefaultAsync(t => t.TeacherId == student.TeacherId);

            Student s = new Student()
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                ClassName = student.ClassName,
                ParentId = student.ParentId,
                TeacherId = student.TeacherId,
                Parent_ = p,
                Teacher_ = t
            };
            _context.Student_table.Add(s);
            await _context.SaveChangesAsync();

            //  return CreatedAtAction("GetStudent", new { id = s.StudentId }, s);
            return s;
        }
        // POST: api/Students
        /* [HttpPost]
         public async Task<ActionResult<Student>> PostStudent(Student s)
         {
             _context.Student_table.Add(s);
             await _context.SaveChangesAsync();

             return CreatedAtAction("GetAdmin", new { id = s.StudentId }, s);
         }*/

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Student_table.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Student_table.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // get student by teacher
        [HttpGet]
        [Route("students/{teacherId}")]
        public async Task<ActionResult<IEnumerable<Student>>> getStudentsByTeacher(int teacherId)
        {
            var students = await _context.Student_table.FromSqlInterpolated
                 ($"select StudentId,StudentName,ClassName,ParentId,TeacherId from Student_table where TeacherId = {teacherId}")
                 .Include("Parent_")
                 .ToListAsync();


            return Ok(students);

        }

        private bool StudentExists(int id)
        {
            return _context.Student_table.Any(e => e.StudentId == id);
        }
    }
}
