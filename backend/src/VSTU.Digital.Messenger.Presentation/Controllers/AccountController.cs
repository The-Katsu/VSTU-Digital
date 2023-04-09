using MediatR;
using Microsoft.AspNetCore.Mvc;
using VSTU.Digital.Messenger.Application.Users.Commands.CreateUsersCommand;
using VSTU.Digital.Messenger.Application.Users.Commands.DeleteUserCommand;
using VSTU.Digital.Messenger.Application.Users.Commands.RegisterCommand;
using VSTU.Digital.Messenger.Application.Users.Queries.GetUsersQuery;
using VSTU.Digital.Messenger.Application.Users.Queries.LoginQuery;
using VSTU.Digital.Messenger.Application.Users.Queries.RefreshTokenQuery;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;

namespace VSTU.Digital.Messenger.Presentation.Controllers;

public class AccountController : ApiController
{
    public AccountController(ISender sender) : base(sender) { }

    [HttpPost]
    [Route("/registration")]
    public async Task<IActionResult> Register(RegisterUserCommand command)
    {
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest(result.Error);
    }

    [HttpPost]
    [Route("/login")]
    public async Task<IActionResult> Login(LoginUserQuery query)
    {
        var result = await Sender.Send(query);
        return result.Success ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpPost]
    [Route("/refreshToken")]
    public async Task<IActionResult> RefreshToken(RefreshTokenQuery query)
    {
        var result = await Sender.Send(query);
        return result.Success ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpPost]
    [Route("/createUsers")]
    public async Task<IActionResult> CreateUsers(CreateUsersCommand command)
    {
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest(result.Error);
    }

    [HttpGet]
    [Route("/getUsers")]
    public async Task<IActionResult> GetUsers()
    {
        var result = await Sender.Send(new GetUsersQuery());
        return result.Success ? Ok(result.Value) : BadRequest(result.Error); 
    }
    
    [HttpDelete]
    [Route("/deleteUser")]
    public async Task<IActionResult> DeleteUser(DeleteUserCommand command)
    {
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest(result.Error); 
    }
}