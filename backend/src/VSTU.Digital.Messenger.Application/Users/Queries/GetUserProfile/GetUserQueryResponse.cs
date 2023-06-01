namespace VSTU.Digital.Messenger.Application.Users.Queries.GetUserProfile;

public record GetUserQueryResponse(
    string Login,
    string Surname,
    string Name,
    string Patronymic,
    string Group);