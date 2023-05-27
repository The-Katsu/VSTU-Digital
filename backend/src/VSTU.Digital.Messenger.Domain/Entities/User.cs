namespace VSTU.Digital.Messenger.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string GroupName { get; set; }
    public string Password { get; set; }
    public int RoleId { get; set; }

    public virtual Role Role { get; set; }
    public virtual ICollection<Chat> ChatsCreated { get; set; }
    public virtual ICollection<Message> Messages { get; set; }
    public virtual ICollection<UserChat> UserChats { get; set; }
}