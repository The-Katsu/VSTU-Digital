using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.DeleteChat;

public class DeleteChatCommandHandler : ICommandHandler<DeleteChatCommand>
{
    private readonly MessengerDbContext _dbContext;

    public DeleteChatCommandHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result> Handle(DeleteChatCommand request, CancellationToken cancellationToken)
    {
        var entity = await _dbContext
            .Chats
            .SingleAsync(
                x => x.Id == request.ChatId, 
                cancellationToken);

        if (entity.OwnerId != request.UserId)
            return Result.Fail("Only owner can delete chat");

        _dbContext.Remove(entity);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}