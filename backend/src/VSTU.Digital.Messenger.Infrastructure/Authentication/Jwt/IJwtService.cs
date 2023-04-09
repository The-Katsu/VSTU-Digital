using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Authentication.Jwt;

public interface IJwtService
{
    public string GenerateToken(User user);
    public bool ValidateToken(string token);
}