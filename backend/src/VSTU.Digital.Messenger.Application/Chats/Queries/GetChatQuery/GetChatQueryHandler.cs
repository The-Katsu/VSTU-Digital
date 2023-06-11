using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatQuery;

public class GetChatQueryHandler : IQueryHandler<GetChatQuery, GetChatQueryResponse>
{
    private readonly MessengerDbContext _dbContext;

    public GetChatQueryHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<GetChatQueryResponse>> Handle(GetChatQuery request, CancellationToken cancellationToken)
    {
        var chat = await _dbContext.Chats.SingleAsync(
            x => x.Id == request.Id, 
            cancellationToken: cancellationToken);

        var groups = chat.Groups.Select(x => x.Name).ToList();

        var response = new GetChatQueryResponse(
            chat.Id,
            chat.Name,
            groups);
        
        return Result.Ok(response);
    }
}