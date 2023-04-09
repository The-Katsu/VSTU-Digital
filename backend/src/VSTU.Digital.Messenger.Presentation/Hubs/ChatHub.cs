using Microsoft.AspNetCore.SignalR;

namespace VSTU.Digital.Messenger.Presentation.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        await Clients.Group(chatId)
            .SendAsync("Send", $"{Context.User.Identity.Name} joined");
    }

    public async Task LeaveChat(string chatId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
    }
}