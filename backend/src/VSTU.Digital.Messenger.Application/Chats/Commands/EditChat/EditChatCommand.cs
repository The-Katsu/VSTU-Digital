using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.EditChat;

public record EditChatCommand(
    int Id,
    string Name,
    string[] Groups) : ICommand;