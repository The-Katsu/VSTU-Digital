namespace VSTU.Digital.Messenger.Domain.Entities;

public class UserChat
{
    // foreign keys
    public int UserId { get; set; }
    public int ChatId { get; set; }
    public int RoleId { get; set; }
    
    // relations
    public virtual User User { get; set; } = null!;
    public virtual Chat Chat { get; set; } = null!;
    public virtual ChatRole Role { get; set; } = null!;
}