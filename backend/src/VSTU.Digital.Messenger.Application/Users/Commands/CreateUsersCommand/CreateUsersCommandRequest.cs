namespace VSTU.Digital.Messenger.Application.Users.Commands.CreateUsersCommand;

public record CreateUsersCommandRequest(
    string FirstName,
    string LastName,
    string Patronymic,
    string GroupName);