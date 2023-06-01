using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Users.Queries.GetUserProfile;

public record GetUserQuery(int Id) : IQuery<GetUserQueryResponse>;