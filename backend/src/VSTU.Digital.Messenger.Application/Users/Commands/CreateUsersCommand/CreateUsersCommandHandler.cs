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
        
        var newUsers = request
            .Users
            .Where(x => !usernames.Contains(x.Username))
            .ToList();
        
        var existedUsers = request.Users.Except(newUsers).ToList();

        foreach (var user in existedUsers)
        {
            var existedUser = await _userRepository.FindByUsername(user.Username);
            
            if (existedUser == null) continue;
            existedUser.FirstName = user.FirstName;
            existedUser.LastName = user.LastName;
            existedUser.Patronymic = user.Patronymic;
            existedUser.GroupName = user.GroupName;
        }
        
        var users = newUsers.Select(user => new User
            {
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                GroupName = user.GroupName,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                RoleId = user.IsTeacher ? 2 : 3
            })
            .ToList();

        await _userRepository.CreateUsers(users);
        await _unitOfWork.SaveAsync(cancellationToken);
        
        return Result.Ok();
    }
}