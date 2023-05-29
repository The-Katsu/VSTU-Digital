namespace VSTU.Digital.Messenger.Domain.Entities;

public class Group
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    // relations
    public virtual ICollection<Chat> Chats { get; set; } = new List<Chat>();
}