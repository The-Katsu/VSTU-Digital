namespace VSTU.Digital.Messenger.Application.Users.Queries.GetUsersQuery;

public record GetUsersQueryResponseItem(
    int Id,
    string Name,
    string Role,
    string GroupName,
    string Username,
    string Password);