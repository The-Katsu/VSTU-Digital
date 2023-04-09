using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Commands.RegisterCommand;

public record RegisterUserCommand(
    string Username,
    string FirstName,
    string LastName,
    string Patronymic,
    string Password,
    bool IsStudent,
    string GroupName) : ICommand;