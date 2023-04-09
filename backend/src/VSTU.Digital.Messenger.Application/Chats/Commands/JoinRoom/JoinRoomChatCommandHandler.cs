using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.JoinRoom;

public class JoinRoomChatCommandHandler : ICommandHandler<JoinRoomChatCommand>
{
    private readonly IUnitOfWork _unitOfWork;

    public JoinRoomChatCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(JoinRoomChatCommand request, CancellationToken cancellationToken)
    {
        var userChat = new UserChat
        {
            UserId = request.UserId,
            ChatId = request.ChatId
        };
        await _unitOfWork.AddAsync(userChat, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);
        return Result.Ok();
    }
}