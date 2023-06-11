namespace VSTU.Digital.Messenger.Application.Chats.Queries.GetChatQuery;

public record GetChatQueryResponse(int Id, string Name, List<string> Groups);