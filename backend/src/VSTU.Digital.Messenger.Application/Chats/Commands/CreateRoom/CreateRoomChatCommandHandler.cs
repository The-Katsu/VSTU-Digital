using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateRoom;

public sealed class CreateRoomChatCommandHandler : ICommandHandler<CreateRoomChatCommand, CreateRoomChatResponse>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateRoomChatCommandHandler(
        IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<CreateRoomChatResponse>> Handle(
        CreateRoomChatCommand request, 
        CancellationToken cancellationToken)
    {
        var chat = new Chat
        {
            Name = request.Name,
            IsGroupChat = true
        };
        await _unitOfWork.AddAsync(chat, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);
        return Result.Ok(new CreateRoomChatResponse(chat.Id, chat.Name));
    }
}