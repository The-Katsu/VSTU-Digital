using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public sealed class RoleRepository : IRoleRepository
{
    private readonly MessengerDbContext _dbContext;

    public RoleRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Role> GetStudentRole() => 
        await _dbContext.Roles.FirstAsync(x => x.Name == "Студент");

    public async Task<Role> GetTeacherRole() => 
        await _dbContext.Roles.FirstAsync(x => x.Name == "Преподаватель");
}