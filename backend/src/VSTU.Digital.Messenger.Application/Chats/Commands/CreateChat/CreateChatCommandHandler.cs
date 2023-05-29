using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateChat;

public class CreateChatCommandHandler : ICommandHandler<CreateChatCommand, CreateChatCommandResponse>
{
    private readonly MessengerDbContext _dbContext;

    public CreateChatCommandHandler(
        MessengerDbContext messengerDbContext)
    {
        _dbContext = messengerDbContext;
    }

    public async Task<Result<CreateChatCommandResponse>> Handle(
        CreateChatCommand request, 
        CancellationToken cancellationToken)
    {
        foreach (var groupName in request.Groups)
        {
            var isExisted = await _dbContext
                .Groups
                .AnyAsync(
                    x => x.Name == groupName, 
                    cancellationToken: cancellationToken);

            if (!isExisted)
            {
                await _dbContext
                    .Groups
                    .AddAsync(
                        new Group { Name = groupName }, 
                        cancellationToken);
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
        }

        var chat = new Chat();
        
        var groups = await _dbContext
            .Groups
            .Where(x => request.Groups.Contains(x.Name))
            .ToListAsync(cancellationToken);

        var users = await _dbContext
            .Users
            .Where(x => groups.Contains(x.Group))
            .ToListAsync(cancellationToken);

        var chatUsers = users
            .Select(
                user => new UserChat { User = user, Chat = chat, RoleId = 3 })
            .ToList();

        var admin = await _dbContext
            .Users
            .SingleOrDefaultAsync(
                x => x.Id == request.CreatorId, 
                cancellationToken: cancellationToken);

        chatUsers.Add(new UserChat{ User = admin!, Chat = chat, ChatId = chat.Id, RoleId = 1});
        
        chat.Name = request.ChatName;
        chat.Groups = groups;
        chat.UserChats = chatUsers;
        chat.OwnerId = admin!.Id;
        chat.Owner = admin;

        await _dbContext.AddAsync(chat, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        var owner = $"{admin!.LastName} {admin.FirstName.First()}. {admin.Patronymic.First()}";
        
        return Result.Ok(new CreateChatCommandResponse(
            chat.Id,
            chat.Name,
            owner));
    }
}