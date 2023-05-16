namespace VSTU.Digital.Messenger.Application.Users.Queries.LoginQuery;

public record UserDto(
    string Username,
    string FirstName,
    string LastName,
    string Patronymic,
    string Group);