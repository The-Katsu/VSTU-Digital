using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public class ChatRepository : IChatRepository
{
    private readonly MessengerDbContext _dbContext;

    public ChatRepository(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<List<Chat>> GetListAsync() => await _dbContext.Chats.ToListAsync();

    public async Task<List<Chat>> GetChatsByGroup(string group) => await _dbContext
        .Chats
        .Where(x => x.Groups.Any(g => g.Name == group))
        .ToListAsync();

    public async Task<List<Chat>> GetTeacherChats(int id) => await _dbContext
        .Chats
        //.Where(x => x.Creator.Id == id)
        .ToListAsync();

    public async Task<List<Chat>> GetStudentChats(string group) => await _dbContext
        .Chats
        .Where(x => x
            .Groups
            .Select(g => g.Name)
            .Contains(group))
        .ToListAsync();
}