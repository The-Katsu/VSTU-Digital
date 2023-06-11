using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.EditChat;

public class EditChatCommandHandler : ICommandHandler<EditChatCommand>
{
    private readonly MessengerDbContext _dbContext;

    public EditChatCommandHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result> Handle(EditChatCommand request, CancellationToken cancellationToken)
    {
        var entity = await _dbContext
            .Chats
            .Include(x => x.Groups)
            .SingleAsync(
                x => x.Id == request.Id, 
                cancellationToken);

        _dbContext.Chats.FromSqlRaw("DELETE FROM chat_group WHERE chats_id = {0}", entity.Id);

        var groups = await _dbContext
            .Groups
            .Where(x => request.Groups.Contains(x.Name))
            .ToListAsync(cancellationToken);

        entity.Name = request.Name;
        entity.Groups = groups;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}