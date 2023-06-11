using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.DeleteChat;

public record DeleteChatCommand(int ChatId, int UserId) : ICommand;