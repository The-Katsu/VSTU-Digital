using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IChatRepository
{
    public Task<List<Chat>> GetListAsync();
}