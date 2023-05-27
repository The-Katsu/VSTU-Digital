using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;

public class GetChatsQueryHandler : IQueryHandler<GetChatsQuery, List<GetChatsResponseItem>>
{
    private readonly IChatRepository _chatRepository;
    private readonly IUserRepository _userRepository;

    public GetChatsQueryHandler(IChatRepository chatRepository, IUserRepository userRepository)
    {
        _chatRepository = chatRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<List<GetChatsResponseItem>>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetById(request.UserId);

        var chats = Enumerable.Empty<Chat>();

        if (user!.RoleId == 2)
            chats = await _chatRepository.GetTeacherChats(user.Id);
        else
        {
            chats = await _chatRepository.GetStudentChats(user.GroupName);
        }
        
        var chatsResponse = chats
            .Select(x => new GetChatsResponseItem(
                x.Id,
                x.Name,
                $"{x.Creator.LastName} {x.Creator.FirstName.First()}.{x.Creator.Patronymic.First()}."))
            .ToList();
        return Result.Ok(chatsResponse);
    }
}