using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Commands.DeleteUserCommand;

public record DeleteUserCommand(int Id) : ICommand;