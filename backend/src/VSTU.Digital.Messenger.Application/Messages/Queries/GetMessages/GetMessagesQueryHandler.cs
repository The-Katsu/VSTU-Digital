using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;

namespace VSTU.Digital.Messenger.Application.Messages.Queries.GetMessages;

public class GetMessagesQueryHandler : IQueryHandler<GetMessagesQuery, GetMessagesQueryResponse>
{
    public Task<Result<GetMessagesQueryResponse>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}