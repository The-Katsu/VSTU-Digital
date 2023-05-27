using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace VSTU.Digital.Messenger.Presentation.Controllers.Base;

[ApiController]
public abstract class ApiController : ControllerBase
{
    protected readonly ISender Sender;

    protected ApiController(ISender sender) => Sender = sender;

    protected int GetUserId() => int.Parse
        (User.FindFirst(ClaimTypes.NameIdentifier).Value);
    
    protected string GetToken() => Request
        .Headers[HeaderNames.Authorization]
        .ToString()
        .Replace("Bearer ", string.Empty);
}