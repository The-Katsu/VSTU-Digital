namespace VSTU.Digital.Messenger.Application.Users.Commands.CreateUsersCommand;

public record CreateUsersCommandRequest(
    string Username,
    string FirstName,
    string LastName,
    string Patronymic,
    string GroupName,
    string Password,
    bool IsTeacher);