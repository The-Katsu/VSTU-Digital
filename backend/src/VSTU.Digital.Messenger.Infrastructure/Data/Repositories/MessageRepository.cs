using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly MessengerDbContext _dbContext;

    public MessageRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Message> GetById(int id) => 
        await _dbContext.Messages
            .Include(x => x.Sender)
            .FirstAsync(x => x.Id == id);
}