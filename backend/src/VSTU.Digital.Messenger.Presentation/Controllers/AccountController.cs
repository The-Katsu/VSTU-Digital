using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VSTU.Digital.Messenger.Application.Tokens.Commands;
using VSTU.Digital.Messenger.Application.Users.Queries.GetUserProfile;
using VSTU.Digital.Messenger.Application.Users.Queries.LoginQuery;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;

namespace VSTU.Digital.Messenger.Presentation.Controllers;


[Route("api/[controller]")]
public class AccountController : ApiController
{
    public AccountController(ISender sender) : base(sender) { }

    /// <summary>
    /// Получить токен доступа на основе логина и пароля.
    /// </summary>
    /// <param name="query">{login: string, password: string}</param>
    /// <returns>JWT-токен</returns>
    [HttpPost]
    [Route("login")]
    [ProducesResponseType(typeof(LoginUserResponse), 200)]
    [ProducesResponseType(typeof(string), 400)]
    public async Task<IActionResult> Login(LoginUserQuery query)
    {
        var result = await Sender.Send(query);
        return result.Success ? Ok(result.Value) : BadRequest(result.Error);
    }

    /// <summary>
    /// Проверить токен доступа на валидность.
    /// </summary>
    /// <returns>200 - валиден, 400 - не валиден</returns>
    [HttpGet]
    [Authorize]
    [Route("isAuthenticated")]
    [ProducesResponseType( 200)]
    [ProducesResponseType(typeof(string), 400)]
    public async Task<IActionResult> IsTokenValid()
    {
        var token = GetToken();
        var command = new VerifyTokenCommand(token);
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest(result.Error); 
    }

    [HttpGet]
    [Authorize]
    [Route("getProfile")]
    public async Task<IActionResult> GetProfile()
    {
        var result = await Sender.Send(new GetUserQuery(GetUserId()));
        return Ok(result.Value);
    }
}