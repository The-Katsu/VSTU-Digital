namespace VSTU.Digital.Messenger.Domain.Entities;

public class UserRole
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    
    // relations
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}