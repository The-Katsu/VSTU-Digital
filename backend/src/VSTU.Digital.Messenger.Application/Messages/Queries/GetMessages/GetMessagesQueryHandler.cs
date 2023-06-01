using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Messages.Queries.GetMessages;

public class GetMessagesQueryHandler : IQueryHandler<GetMessagesQuery, List<GetMessagesQueryResponse>>
{
    private readonly MessengerDbContext _dbContext;

    public GetMessagesQueryHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    private string ToFio(string surname, string name, string patronymic) =>
        $"{surname} {name.First()}. {patronymic.First()}.";
    
    public async Task<Result<List<GetMessagesQueryResponse>>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var chat = await _dbContext
            .Chats
            .SingleAsync(x => x.Id == request.Id, cancellationToken);
        
        
        var messages =  chat.Messages.Select(x => new GetMessagesQueryResponse(
            x.Text,
            ToFio(x.Sender.LastName, x.Sender.FirstName, x.Sender.Patronymic),
            x.SenderId,
            x.Timestamp.ToString("dd/MM/yyyy HH:mm:ss"))).ToArray();
        
        Array.Reverse(messages);
        
        return Result.Ok(messages.ToList());
    }
}