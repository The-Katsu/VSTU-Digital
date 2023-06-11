using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatQuery;

public record GetChatQuery(int Id) : IQuery<GetChatQueryResponse>;