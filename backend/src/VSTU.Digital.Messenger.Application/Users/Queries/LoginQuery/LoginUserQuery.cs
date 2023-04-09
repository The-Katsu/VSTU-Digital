using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Queries.LoginQuery;

public sealed record LoginUserQuery(string Username, string Password) : IQuery<LoginUserResponse>;