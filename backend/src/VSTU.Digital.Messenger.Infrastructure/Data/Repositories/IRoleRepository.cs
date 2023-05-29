using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IRoleRepository
{
    public Task<UserRole> GetStudentRole();
    public Task<UserRole> GetTeacherRole();
}