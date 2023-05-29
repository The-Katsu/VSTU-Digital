using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateChat;

public record CreateChatCommand(
    int CreatorId,
    string ChatName,
    string[] Groups) : ICommand<CreateChatCommandResponse>;