using Microsoft.AspNetCore.Identity;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Authentication.Jwt;
using VSTU.Digital.Messenger.Infrastructure.Data;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Users.Queries.LoginQuery;

public sealed class LoginUserQueryHandler : IQueryHandler<LoginUserQuery, LoginUserResponse>
{
    private readonly IJwtService _jwtService;
    private readonly IUserRepository _userRepository;
    
    public LoginUserQueryHandler(IUserRepository userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<Result<LoginUserResponse>> Handle(
        LoginUserQuery request, 
        CancellationToken cancellationToken)
    {
        var user = await _userRepository.FindByUsername(request.Username);

        if (user is null)
            return Result.Fail<LoginUserResponse>($"User with username {request.Username} was not found.");

        var isPasswordCorrect = user.Password == request.Password;
        
        if (!isPasswordCorrect)
            return Result.Fail<LoginUserResponse>($"Wrong password for username: {request.Username}");

        var token = _jwtService.GenerateToken(user);
        var userDto = new UserDto(user.Username, user.FirstName, user.LastName, user.Patronymic, user.GroupName);
        
        return Result.Ok(new LoginUserResponse(token, userDto));
    }
}