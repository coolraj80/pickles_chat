using System.ComponentModel.DataAnnotations;

namespace PicklesChat.Models
{
    public class ChatRoom
    {
        public long Id { get; set; }
        public string Name { get; set; }        
    }

    public class ChatMessage
    {
        [Key]
        public long Id { get; set; }
        public string ChatRoom { get; set; }
        public string UserName { get; set; }        
        public string Message { get; set; }
    }
}
