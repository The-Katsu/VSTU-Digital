using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Commands.CreateUsersCommand;

public record CreateUsersCommand(
    IReadOnlyList<CreateUsersCommandRequest> Users) : ICommand;