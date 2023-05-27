using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VSTU.Digital.Messenger.Application.Chats.Commands.CreateRoom;
using VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;
using VSTU.Digital.Messenger.Presentation.Dtos;
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
    /// Создать групповой чат
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    [HttpPost]
    [AllowAnonymous]
    [Route("create")]
    [ProducesResponseType(typeof(CreateRoomChatResponse), 200)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateRoom(CreateChatDto dto, CancellationToken ct)
    {
        var command = new CreateRoomChatCommand(dto.Name, dto.Groups, GetUserId());
        var result = await Sender.Send(command, ct);
        return result.Success ? Ok(result.Value) : BadRequest();
    }
    
    /// <summary>
    /// Редактировать групповой чат
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    [HttpPut]
    [AllowAnonymous]
    [ProducesResponseType(400)]
    [Route("edit")]
    public async Task<IActionResult> EditRoom(CreateChatDto dto, CancellationToken ct)
    {
        var command = new CreateRoomChatCommand(dto.Name, dto.Groups, GetUserId());
        var result = await Sender.Send(command, ct);
        return result.Success ? Ok(result.Value) : BadRequest();
    }
    
    /// <summary>
    /// Удалить групповой чат
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    [HttpDelete]
    [AllowAnonymous]
    [Route("delete")]
    public async Task<IActionResult> DeleteRoom(CreateChatDto dto, CancellationToken ct)
    {
        var command = new CreateRoomChatCommand(dto.Name, dto.Groups, GetUserId());
        var result = await Sender.Send(command, ct);
        return result.Success ? Ok(result.Value) : BadRequest();
    }

    /// <summary>
    /// Получить список чатов
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route("getAll")]
    public async Task<IActionResult> GetChats()
    {
        var query = new GetChatsQuery(GetUserId());
        var result = await Sender.Send(query);
        return Ok(result.Value);
    }
}