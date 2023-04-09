using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Messages.Commands.CreateMessage;

public class CreateMessageCommandHandler : ICommandHandler<CreateMessageCommand, CreateMessageResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMessageRepository _messageRepository;

    public CreateMessageCommandHandler(
        IUnitOfWork unitOfWork, 
        IMessageRepository messageRepository)
    {
        _unitOfWork = unitOfWork;
        _messageRepository = messageRepository;
    }

    public async Task<Result<CreateMessageResponse>> Handle(
        CreateMessageCommand request, 
        CancellationToken cancellationToken)
    {
        var message = new Message
        {
            Text = request.Message,
            Timestamp = DateTime.Now,
            SenderId = request.UserId,
            ChatId = request.ChatId
        };

        await _unitOfWork.AddAsync(message, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        message = await _messageRepository.GetById(message.Id);

        var response = new CreateMessageResponse(
            message.Text, 
            message.Sender.Username,
            message.Timestamp.ToString("G"));

        return Result.Ok(response);
    }
}