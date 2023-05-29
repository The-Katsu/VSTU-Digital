namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateChat;

public record CreateChatCommandResponse(
    int Id,
    string Name,
    string Owner);