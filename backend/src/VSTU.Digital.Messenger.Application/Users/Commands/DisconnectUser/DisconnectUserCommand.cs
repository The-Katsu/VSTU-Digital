using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Commands.DisconnectUser;

public record DisconnectUserCommand(int ChatId, int UserId) : ICommand;