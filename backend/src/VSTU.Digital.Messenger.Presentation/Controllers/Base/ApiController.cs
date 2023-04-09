using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace VSTU.Digital.Messenger.Presentation.Controllers.Base;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiController : ControllerBase
{
    protected readonly ISender Sender;

    protected ApiController(ISender sender) => Sender = sender;

    protected int GetUserId() => int.Parse
        (User.FindFirst(ClaimTypes.NameIdentifier).Value);
}