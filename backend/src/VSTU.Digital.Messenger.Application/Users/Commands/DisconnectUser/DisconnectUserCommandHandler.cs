using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Users.Commands.DisconnectUser;

public class DisconnectUserCommandHandler : ICommandHandler<DisconnectUserCommand>
{
    private readonly MessengerDbContext _dbContext;

    public DisconnectUserCommandHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result> Handle(DisconnectUserCommand request, CancellationToken cancellationToken)
    {
        var chat = await _dbContext
            .UserChats
            .SingleOrDefaultAsync(x =>
                x.ChatId == request.ChatId && 
                x.UserId == request.UserId, 
                cancellationToken: cancellationToken);

        chat!.LastConnection = DateTime.Now;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}