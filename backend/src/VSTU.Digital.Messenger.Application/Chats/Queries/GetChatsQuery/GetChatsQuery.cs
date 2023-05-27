using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;

public record GetChatsQuery(int UserId) : IQuery<List<GetChatsResponseItem>>;