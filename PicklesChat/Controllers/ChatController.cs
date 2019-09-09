using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PicklesChat.Models;

namespace PicklesChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatContext _context;

        public ChatController(ChatContext context)
        {
            _context = context;

            if (_context.ChatRooms.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.ChatRooms.Add(new ChatRoom
                {
                    Id = 1,
                    Name = "ChatRoom1"
                });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<ChatRoom>>> GetChatRooms()
        {
            return await _context.ChatRooms.ToListAsync();
        }

        [HttpGet("{id}")]        
        public async Task<ActionResult<ChatRoom>> GetChatRoom(long id)
        {
            var chatRoom = await _context.ChatRooms.FindAsync(id);

            if (chatRoom == null)
            {
                return NotFound();
            }

            return chatRoom;
        }


        [HttpGet("{ChatRoom}")]
        [Route("[action]/{ChatRoom}")]        
        public async Task<ActionResult<IEnumerable<ChatMessage>>> GetChatMessages(string ChatRoom)
        {
            return await _context.ChatMessages.Where(p => p.ChatRoom == ChatRoom).ToListAsync();
            // return await _context.ChatMessages.ToListAsync();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<TodoItem>> NewChatRoom(ChatRoom item)
        {
            _context.ChatRooms.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChatRoom), new { id = item.Id }, item);
        }

        
        [HttpPost]
        [Route("[action]")]
        public async void InsertChatMessage(ChatMessage message)
        {
            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            // return CreatedAtAction(nameof(GetChatMessages), new { ChatRoom = message.ChatRoom }, message);
        }
      
    }


}