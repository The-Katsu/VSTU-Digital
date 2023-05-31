using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;

public class GetChatsQueryHandler : IQueryHandler<GetChatsQuery, List<GetChatsResponseItem>>
{
    private readonly MessengerDbContext _dbContext;

    public GetChatsQueryHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<List<GetChatsResponseItem>>> Handle(
        GetChatsQuery request, 
        CancellationToken cancellationToken)
    {
        var user = await _dbContext
            .Users
            .Include(x => x.Group)
            .SingleOrDefaultAsync(
                x => x.Id == request.UserId, 
                cancellationToken: cancellationToken);

        var chats = user!.RoleId == 3 ? 
            await _dbContext
                .Chats
                .Where(x => x.Groups.Any(g => g.Name == user.Group.Name))
                .ToListAsync(cancellationToken)
            :
            await _dbContext
                .Chats
                .Where(x => x.UserChats.Any(u => u.UserId == user.Id))
                .ToListAsync(cancellationToken);

        var response = new List<GetChatsResponseItem>();

        foreach (var chat in chats)
        {
            var owner = $"{chat.Owner.LastName} {chat.Owner.FirstName.First()}. {chat.Owner.Patronymic.First()}.";
            
            var chatRef = await _dbContext
                .UserChats
                .SingleOrDefaultAsync(x => 
                        x.ChatId == chat.Id &&
                        x.UserId == chat.OwnerId, 
                        cancellationToken: cancellationToken);
            
            var msgCount = chat
                .Messages
                .Count(x => 
                    x.Timestamp > chatRef!.LastConnection);

            response.Add(new GetChatsResponseItem(
                chat.Id,
                chat.Name,
                owner,
                msgCount));
        }
        
        return Result.Ok(response);
    }
}