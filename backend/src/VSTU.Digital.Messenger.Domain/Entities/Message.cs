namespace VSTU.Digital.Messenger.Domain.Entities;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public DateTime Timestamp { get; set; }
    
    // foreign keys
    public int SenderId { get; set; }
    public int ChatId { get; set; }
    
    // relation config
    public virtual User Sender { get; set; } = null!;
    public virtual Chat Chat { get; set; } = null!;
}