using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.JoinRoom;

public record JoinRoomChatCommand(
    int UserId, 
    int ChatId) : ICommand;