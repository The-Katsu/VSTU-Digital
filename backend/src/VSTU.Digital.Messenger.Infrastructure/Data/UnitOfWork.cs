using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly MessengerDbContext _dbContext;

    public UnitOfWork(
        MessengerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task SaveAsync(CancellationToken cancellationToken) => 
        await _dbContext.SaveChangesAsync(cancellationToken);

    public async Task AddAsync<T>(T entity, CancellationToken cancellationToken) => 
        await _dbContext.AddAsync(entity, cancellationToken);

    public async Task AddRangeAsync<T>(List<T> entities, CancellationToken cancellationToken) => 
        await _dbContext.AddRangeAsync(entities, cancellationToken);
}