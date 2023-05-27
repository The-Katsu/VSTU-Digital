using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly MessengerDbContext _dbContext;

    public GroupRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<List<Group>> GetAllAsync()
    {
        return await _dbContext.Groups.ToListAsync();
    }
}