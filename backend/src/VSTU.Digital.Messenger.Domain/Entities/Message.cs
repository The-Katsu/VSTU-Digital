﻿namespace VSTU.Digital.Messenger.Domain.Entities;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; }
    public DateTime Timestamp { get; set; }
    public int SenderId { get; set; }
    public int ChatId { get; set; }

    public virtual User Sender { get; set; }
    public virtual Chat Chat { get; set; }
    public virtual ICollection<MessageContent> Content { get; set; }
}