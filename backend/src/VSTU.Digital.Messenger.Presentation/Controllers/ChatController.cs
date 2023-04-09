using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VSTU.Digital.Messenger.Application.Chats.Commands.CreateRoom;
using VSTU.Digital.Messenger.Application.Chats.Commands.JoinRoom;
using VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;
using VSTU.Digital.Messenger.Application.Messages.Commands.CreateMessage;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;
using VSTU.Digital.Messenger.Presentation.Dtos;
using VSTU.Digital.Messenger.Presentation.Hubs;

namespace VSTU.Digital.Messenger.Presentation.Controllers;

[Authorize]
public sealed class ChatController : ApiController
{
    private readonly IHubContext<ChatHub> _hubContext;
    
    public ChatController(ISender sender, IHubContext<ChatHub> hubContext) : base(sender)
    {
        _hubContext = hubContext;
    }
    
    [HttpPost]
    [Route("/create")]
    public async Task<IActionResult> CreateRoom(CreateChatDto dto, CancellationToken ct)
    {
        var command = new CreateRoomChatCommand(dto.Name);
        var result = await Sender.Send(command, ct);
        return result.Success ? Ok(result.Value) : BadRequest();
    }

    [HttpPost]
    [Route("/sendMessage")]
    public async Task<IActionResult> SendMessage(SendMessageDto dto)
    {
        var command = new CreateMessageCommand(dto.ChatId, dto.Message, GetUserId());
        var result = await Sender.Send(command);
        
        await _hubContext.Clients.Group(dto.ChatId.ToString())
            .SendAsync("Send", result.Value);

        return Ok();
    }

    [HttpGet]
    [Route("/chats")]
    public async Task<IActionResult> GetChats()
    {
        var query = new GetChatsQuery();
        var result = await Sender.Send(query);
        return Ok(result.Value);
    }
}