using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IUserRepository
{
    public Task<User?> FindByUsername(string username);
    public Task<List<string>> GetUsernames();
    public Task CreateUsers(List<User> users);
    public Task<List<User>> GetAllAsync();
    public Task DeleteUser(int id);
}