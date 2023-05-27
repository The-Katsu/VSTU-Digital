using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

public interface IMessageRepository
{
    public Task<Message> GetById(int id);
    public Task<List<Message>> GetChatMessagesAsync(int chatId);
}