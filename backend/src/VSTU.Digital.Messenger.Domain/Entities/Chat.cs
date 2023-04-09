namespace VSTU.Digital.Messenger.Domain.Entities;

public class Chat
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsGroupChat { get; set; }

    public virtual ICollection<Message> Messages { get; set; }
    public virtual ICollection<UserChat> UserChats { get; set; }
}