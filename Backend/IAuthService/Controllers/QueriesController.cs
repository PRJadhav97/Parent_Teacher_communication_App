using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IAuthService.Models;
using Parrent_Teacher_Comm_app.Data;
using Microsoft.AspNetCore.JsonPatch;
using IAuthService.Models.RequestModels;


namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QueriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Queries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Query>>> GetQuery_table()
        {
            return await _context.Query_table.ToListAsync();
        }

        // GET: api/Queries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Query>> GetQuery(int id)
        {
            var query = await _context.Query_table.FindAsync(id);

            if (query == null)
            {
                return NotFound();
            }

            return query;
        }

        [HttpGet("classname/{className}")]
        public async Task<ActionResult<IEnumerable<Query>>> GetQueryByClassName(string className)
        {
            var queries = await _context.Query_table
                                        .Where(q => q.ClassName == className)
                                        .ToListAsync();

            if (queries == null || queries.Count == 0)
            {
                return NotFound();
            }

            return queries;
        }


        // PUT: api/Queries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuery(int id, Query query)
        {
            if (id != query.QueryId)
            {
                return BadRequest();
            }

            _context.Entry(query).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QueryExists(id))
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

        // POST: api/Queries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Query>> PostQuery(QueryRequest queryRequest)
        {

            /*if (queryRequest == null)
            {  return NotFound(); }*/
            var query = new Query
            {
                UserName = queryRequest.UserName,
                AskedQuery = queryRequest.AskedQuery,
                ClassName = queryRequest.ClassName,
                QueryDate = DateOnly.FromDateTime(DateTime.Now),
                QueryTime = TimeOnly.FromDateTime(DateTime.Now),
                IsAnswered = false,
                StudentName = queryRequest.StudentName
            };
            _context.Query_table.Add(query);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuery", new { id = query.QueryId }, query);
        }

        // PATCH: api/Queries/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchQuery(int id, [FromBody] JsonPatchDocument<Query> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var query = await _context.Query_table.FindAsync(id);
            if (query == null)
            {
                return NotFound();
            }

            patchDoc.ApplyTo(query, ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                query.IsAnswered = true;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QueryExists(id))
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


        // DELETE: api/Queries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuery(int id)
        {
            var query = await _context.Query_table.FindAsync(id);
            if (query == null)
            {
                return NotFound();
            }

            _context.Query_table.Remove(query);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QueryExists(int id)
        {
            return _context.Query_table.Any(e => e.QueryId == id);
        }
    }
}