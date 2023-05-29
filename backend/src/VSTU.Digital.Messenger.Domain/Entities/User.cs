namespace VSTU.Digital.Messenger.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    // foreign keys
    public int RoleId { get; set; }
    public int GroupId { get; set; }

    
    // relations
    public virtual UserRole Role { get; set; } = null!;
    public virtual Group Group { get; set; } = null!;
    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
    public virtual ICollection<UserChat> UserChats { get; set; } = new List<UserChat>();
}