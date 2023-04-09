using System.IdentityModel.Tokens.Jwt;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Authentication.Jwt;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Users.Queries.RefreshTokenQuery;

public class RefreshTokenQueryHandler : IQueryHandler<RefreshTokenQuery, RefreshTokenResponse>
{
    private readonly IJwtService _jwtService;
    private readonly IUserRepository _userRepository;
    
    public RefreshTokenQueryHandler(IJwtService jwtService, IUserRepository userRepository)
    {
        _jwtService = jwtService;
        _userRepository = userRepository;
    }

    public async Task<Result<RefreshTokenResponse>> Handle(RefreshTokenQuery request, CancellationToken cancellationToken)
    {
        var isValid = _jwtService.ValidateToken(request.Token);
        if (isValid) return Result.Ok(new RefreshTokenResponse(request.Token));

        var username = new JwtSecurityTokenHandler()
            .ReadJwtToken(request.Token)
            .Claims
            .First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")
            .Value;
        
        var user = await _userRepository.FindByUsername(username);
        return Result.Ok(new RefreshTokenResponse(_jwtService.GenerateToken(user)));
    }
}