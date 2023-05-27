namespace VSTU.Digital.Messenger.Application.Messages.Queries.GetMessages;

public record GetMessagesQueryResponse(
    string Text, 
    string SenderName,
    string SenderId,
    string Time);