using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;

public class GetChatsQueryHandler : IQueryHandler<GetChatsQuery, List<GetChatsResponseItem>>
{
    private readonly IChatRepository _chatRepository;

    public GetChatsQueryHandler(IChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    public async Task<Result<List<GetChatsResponseItem>>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
    {
        var chats = await _chatRepository.GetListAsync();
        var chatsResponse = chats
            .Select(x => new GetChatsResponseItem(
                x.Id,
                x.Name))
            .ToList();
        return Result.Ok(chatsResponse);
    }
}