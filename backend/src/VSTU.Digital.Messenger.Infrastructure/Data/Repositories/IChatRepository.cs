using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IChatRepository
{
    public Task<List<Chat>> GetListAsync();
    public Task<List<Chat>> GetChatsByGroup(string group);
    public Task<List<Chat>> GetTeacherChats(int id);
    public Task<List<Chat>> GetStudentChats(string group);
    public DbSet<Chat> Chats();
}