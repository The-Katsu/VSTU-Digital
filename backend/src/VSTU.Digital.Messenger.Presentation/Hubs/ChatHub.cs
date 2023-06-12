using Microsoft.AspNetCore.SignalR;

namespace VSTU.Digital.Messenger.Presentation.Hubs;

public class ChatHub : Hub
{
    /// <summary>
    /// Join to chat via web-sockets
    /// </summary>
    /// <param name="chatId">id to join</param>
    public async Task JoinChat(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        await Clients.Group(chatId)
            .SendAsync("Send", $"{Context.User.Identity.Name} joined");
    }

    /// <summary>
    /// Disconnect from chat hub
    /// </summary>
    /// <param name="chatId">id to leave</param>
    public async Task LeaveChat(string chatId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
    }
}