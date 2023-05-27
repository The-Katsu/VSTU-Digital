using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Messages.Queries.GetMessages;

public record GetMessagesQuery(int Id) : IQuery<List<GetMessagesQueryResponse>>, IQuery<GetMessagesQueryResponse>;