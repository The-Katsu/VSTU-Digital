using System.Text;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Users.Commands.RegisterCommand;

public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    
    public RegisterUserCommandHandler(
        IUserRepository userRepository, 
        IUnitOfWork unitOfWork, 
        IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _roleRepository = roleRepository;
    }

    public async Task<Result> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var role = request.IsStudent ? 
            await _roleRepository.GetStudentRole() : 
            await _roleRepository.GetTeacherRole();
        
        var user = new User
        {
            Username = request.Username,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            GroupName = request.GroupName,
            Password = request.Password,
            Role = role
        };

        await _unitOfWork.AddAsync(user, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return Result.Ok();
    }
}