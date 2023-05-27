namespace VSTU.Digital.Messenger.Application.Messages.Commands.CreateMessage;

public sealed record CreateMessageResponse(
    string Text, 
    string SenderName,
    int SenderId,
    string Time);