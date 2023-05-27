using Group = VSTU.Digital.Messenger.Domain.Entities.Group;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IGroupRepository
{
    public Task<List<Group>> GetAllAsync();
}