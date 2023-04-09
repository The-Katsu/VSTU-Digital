using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateRoom;

public record CreateRoomChatCommand(string Name) : ICommand<CreateRoomChatResponse>;