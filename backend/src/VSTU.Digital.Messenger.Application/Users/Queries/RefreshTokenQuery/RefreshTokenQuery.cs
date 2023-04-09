using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Queries.RefreshTokenQuery;

public record RefreshTokenQuery(string Token) : IQuery<RefreshTokenResponse>;