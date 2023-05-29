namespace VSTU.Digital.Messenger.Domain.Entities;

public class Chat
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    // f_key
    public int OwnerId { get; set; }
    
    // relations
    public virtual User Owner { get; set; } = null!;
    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
    public virtual ICollection<UserChat> UserChats { get; set; } = new List<UserChat>();
}