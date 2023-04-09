using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Application.Utils;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Users.Commands.CreateUsersCommand;

public sealed class CreateUsersCommandHandler : ICommandHandler<CreateUsersCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateUsersCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreateUsersCommand request, CancellationToken cancellationToken)
    {
        var usernames = await _userRepository.GetUsernames();
        var users = request.Users.Select(user => new User
            {
                Username = ShortGuid.NewUsername(usernames),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                GroupName = user.GroupName,
                Password = ShortGuid.NewPassword(),
                RoleId = user.GroupName == string.Empty ? 2 : 3
            })
            .ToList();

        await _userRepository.CreateUsers(users);
        await _unitOfWork.SaveAsync(cancellationToken);
        
        return Result.Ok();
    }
}