namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatsQuery;

public record GetChatsResponseItem(
    int Id,
    string Name,
    string Creator,
    int NewMessagesCount);