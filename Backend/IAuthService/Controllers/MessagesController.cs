using AnniuncementPortal2.Models.RequestModels;
using AnniuncementPortal2.Models;
using IAuthService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parrent_Teacher_Comm_app.Data;
using IAuthService.Models.RequestModels;
using System.Xml.Linq;

namespace IAuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessagesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Messages>>> GetMessage_table()
        {
            return await _context.Message_table.ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Messages>> GetMessages(int id)
        {
            var messages = await _context.Message_table.FindAsync(id);

            if (messages == null)
            {
                return NotFound();
            }

            return messages;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessages(int id, Messages messages)
        {
            if (id != messages.MessageId)
            {
                return BadRequest();
            }

            _context.Entry(messages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessagesExists(id))
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

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPost]
        public async Task<ActionResult<Messages>> PostMessages(Messages messages)
        {
            _context.Message_table.Add(messages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessages", new { id = messages.MessageId }, messages);
        }*/

        [HttpPost]
        public async Task<ActionResult<Messages>> PostMessages(MessagesRequestModel messageReq)
        {
            var messagepoco = new Messages
            {
                Message = messageReq.Message,
                ParentId = messageReq.ParentId,
                TeacherId = messageReq.TeacherId,
                Role = messageReq.Role,
                MessageDate = DateOnly.FromDateTime(DateTime.Now),
                MessageTime = TimeOnly.FromDateTime(DateTime.Now)

            };
            _context.Message_table.Add(messagepoco);
            await _context.SaveChangesAsync();

          return CreatedAtAction("GetMessages", new { id = messagepoco.MessageId }, messagepoco);        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessages(int id)
        {
            var messages = await _context.Message_table.FindAsync(id);
            if (messages == null)
            {
                return NotFound();
            }

            _context.Message_table.Remove(messages);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("getMessagesByParentId/{pid}")]
        public async Task<ActionResult<List<Messages>>> getMessageByParentId(int pid)
        {
            var messages = await _context.Message_table
                .FromSqlInterpolated($"select MessageId,Message,ParentId,TeacherId,Role, MessageTime, MessageDate from Message_table where ParentId={pid}")
                .ToListAsync();
           
            if (messages == null)
            {
                return NotFound();
            }
            return Ok(messages);
        }

        [HttpGet("getMessagesByTIdAndPId/{tid}/{pid}")]
        public async Task<ActionResult<List<Messages>>> getMessagesByTIdAndPId(int tid, int pid)
        {
            var messages = await _context.Message_table
                .FromSqlInterpolated($"select MessageId,Message,ParentId,TeacherId,Role, MessageTime, MessageDate from Message_table where TeacherId={tid} and ParentId={pid}")
                .ToListAsync();

            if (messages == null)
            {
                return NotFound();
            }
            return Ok(messages);
        }



        private bool MessagesExists(int id)
        {
            return _context.Message_table.Any(e => e.MessageId == id);
        }
    }
}
