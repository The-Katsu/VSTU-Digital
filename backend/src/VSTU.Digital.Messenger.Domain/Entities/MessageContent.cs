namespace VSTU.Digital.Messenger.Domain.Entities;

public class MessageContent
{
    public int Id { get; set; }
    public string ContentType { get; set; }
    public string ContentUrl { get; set; }
    public int MessageId { get; set; }

    public virtual Message Message { get; set; }
}