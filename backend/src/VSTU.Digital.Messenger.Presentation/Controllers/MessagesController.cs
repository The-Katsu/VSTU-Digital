using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VSTU.Digital.Messenger.Application.Messages.Commands.CreateMessage;
using VSTU.Digital.Messenger.Presentation.Controllers.Base;
using VSTU.Digital.Messenger.Presentation.Dtos;
using VSTU.Digital.Messenger.Presentation.Hubs;

namespace VSTU.Digital.Messenger.Presentation.Controllers;

[Route("api/[controller]")]
public class MessagesController : ApiController
{
    private readonly IHubContext<ChatHub> _hubContext;
    public MessagesController(
        ISender sender, 
        IHubContext<ChatHub> hubContext) : base(sender) =>
        _hubContext = hubContext;

    /// <summary>
    /// Отправить сообщение в чат
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("send")]
    public async Task<IActionResult> SendMessage(SendMessageDto dto)
    {
        var command = new CreateMessageCommand(dto.ChatId, dto.Message, GetUserId());
        var result = await Sender.Send(command);
        
        await _hubContext.Clients.Group(dto.ChatId.ToString())
            .SendAsync("Send", result.Value);

        return Ok();
    }
}