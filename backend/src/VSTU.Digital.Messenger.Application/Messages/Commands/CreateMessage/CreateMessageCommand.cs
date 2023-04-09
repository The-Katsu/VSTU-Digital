using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Messages.Commands.CreateMessage;

public record CreateMessageCommand(
    int ChatId, 
    string Message, 
    int UserId) : ICommand<CreateMessageResponse>;