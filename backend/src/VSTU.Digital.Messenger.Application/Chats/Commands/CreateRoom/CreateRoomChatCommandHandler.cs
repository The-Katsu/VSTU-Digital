using System.Collections.Immutable;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Chats.Commands.CreateRoom;

public sealed class CreateRoomChatCommandHandler : ICommandHandler<CreateRoomChatCommand, CreateRoomChatResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGroupRepository _groupRepository;
    private readonly IUserRepository _userRepository;

    public CreateRoomChatCommandHandler(
        IUnitOfWork unitOfWork, IGroupRepository groupRepository, 
        IUserRepository userRepository)
    {
        _unitOfWork = unitOfWork;
        _groupRepository = groupRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<CreateRoomChatResponse>> Handle(
        CreateRoomChatCommand request, 
        CancellationToken cancellationToken)
    {
        var dbGroups = await _groupRepository.GetAllAsync();
        var existedGroups = dbGroups
            .Where(x => request.Groups.Contains(x.Name))
            .Select(x => x.Name)
            .ToList();

        var newGroups = request.Groups.Where(x => !existedGroups.Contains(x)).ToList();

        foreach (var name in newGroups)
        {
            var group = new Group { Name = name };
            await _unitOfWork.AddAsync(group, cancellationToken);
        }

        await _unitOfWork.SaveAsync(cancellationToken);
        
        dbGroups = await _groupRepository.GetAllAsync();
        var groups = dbGroups.Where(x => request.Groups.Contains(x.Name)).ToList();
        var creator = await _userRepository.GetById(request.CreatorId);
        
        var chat = new Chat
        {
            Name = request.Name,
            IsGroupChat = true,
            Groups = groups,
            Creator = creator!
        };
        await _unitOfWork.AddAsync(chat, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);
        return Result.Ok(new CreateRoomChatResponse(
            chat.Id, 
            chat.Name,
            $"{chat.Creator.LastName} {chat.Creator.FirstName.First()}.{chat.Creator.Patronymic.First()}."));
    }
}