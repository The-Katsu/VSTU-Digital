using System.Security.Cryptography;
using System.Text;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Utils;

public static class ShortGuid
{
    private static string NewGuid()
    {
        var randomBytes = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
            rng.GetBytes(randomBytes);
        
        var hashBytes = SHA256.HashData(randomBytes);
        
        var sb = new StringBuilder();
        for (var i = 0; i < 4; i++) 
            sb.Append(hashBytes[i].ToString("x2"));
        
        return sb.ToString();
    }

    public static string NewUsername(List<string> usernames)
    {
        var username = $"St%{NewGuid()}";
        while (usernames.Contains(username)) 
            username = $"St%{NewGuid()}";
        return username;
    }

    public static string NewPassword() => $"Pwd?{NewGuid()}";
}