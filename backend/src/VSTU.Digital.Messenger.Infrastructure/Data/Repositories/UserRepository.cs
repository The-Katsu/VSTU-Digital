using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly MessengerDbContext _dbContext;

    public UserRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<User?> FindByUsername(string username) => 
        await _dbContext.Users
            .FirstOrDefaultAsync(x => 
                x != null &&
                x.Username == username);

    public Task<User?> GetById(int id) => _dbContext
        .Users
        .SingleOrDefaultAsync(x => x.Id == id);

    public async Task<List<string>> GetUsernames() =>
        await _dbContext.Users
            .Select(x => x.Username)
            .ToListAsync();

    public async Task CreateUsers(List<User> users) => 
        await _dbContext.Users.AddRangeAsync(users);

    public async Task<List<User>> GetAllAsync() => 
        await _dbContext.Users
            .Where(x => x.RoleId != 1)
            .ToListAsync();

    public async Task DeleteUser(int id)
    {
        var user = await _dbContext.FindAsync<User>(id);
        if (user != null) _dbContext.Users.Remove(user);
    }
}