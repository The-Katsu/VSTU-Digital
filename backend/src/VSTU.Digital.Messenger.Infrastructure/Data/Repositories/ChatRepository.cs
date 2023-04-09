using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public class ChatRepository : IChatRepository
{
    private readonly MessengerDbContext _dbContext;

    public ChatRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<List<Chat>> GetListAsync() => await _dbContext.Chats.ToListAsync();
}