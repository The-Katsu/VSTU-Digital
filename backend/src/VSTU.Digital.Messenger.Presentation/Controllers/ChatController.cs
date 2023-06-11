using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VSTU.Digital.Messenger.Application.Chats.Commands.CreateChat;
using VSTU.Digital.Messenger.Application.Chats.Commands.DeleteChat;
using VSTU.Digital.Messenger.Application.Chats.Commands.EditChat;
using VSTU.Digital.Messenger.Application.Chats.Queries.GetChatQuery;
using VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;
using VSTU.Digital.Messenger.Application.Users.Commands.DisconnectUser;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;
using VSTU.Digital.Messenger.Presentation.Hubs;

namespace VSTU.Digital.Messenger.Presentation.Controllers;

[Authorize]
[Route("api/[controller]")]
public sealed class ChatController : ApiController
{
    private readonly IHubContext<ChatHub> _hubContext;
    
    public ChatController(ISender sender, IHubContext<ChatHub> hubContext) : base(sender)
    {
        _hubContext = hubContext;
    }

    /// <summary>
    /// Создание чата
    /// </summary>
    /// <param name="command"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    [HttpPost]
    [AllowAnonymous]
    [Route("create")]
    public async Task<IActionResult> CreateChat(CreateChatCommand command, CancellationToken ct)
    {
        var result = await Sender.Send(command, ct);
        return result.Success ? Ok(result.Value) : BadRequest();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("onDisconnected")]
    public async Task<IActionResult> OnDisconnected(DisconnectUserCommand command)
    {
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest();
    }

    [HttpGet]
    [Route("get/{id:int}")]
    public async Task<IActionResult> GetChat(int id)
    {
        var query = new GetChatQuery(id);
        var result = await Sender.Send(query);
        return Ok(result.Value);
    }

    [HttpPut]
    [Route("edit")]
    public async Task<IActionResult> EditChat(EditChatCommand command)
    {
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest();
    }

    [HttpDelete]
    [Route("delete/{id:int}")]
    public async Task<IActionResult> DeleteChat(int id)
    {
        var command = new DeleteChatCommand(id, GetUserId());
        var result = await Sender.Send(command);
        return result.Success ? Ok() : BadRequest(result.Error);
    }

    /// <summary>
    /// Получить список чатов
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> GetChats()
    {
        var query = new GetChatsQuery(GetUserId());
        var result = await Sender.Send(query);
        return Ok(result.Value);
    }
}