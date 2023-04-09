namespace VSTU.Digital.Messenger.Infrastructure.Data;

public interface IUnitOfWork
{
    public Task SaveAsync(CancellationToken cancellationToken);
    public Task AddAsync<T>(T entity, CancellationToken cancellationToken);
    public Task AddRangeAsync<T>(List<T> entities, CancellationToken cancellationToken);
}