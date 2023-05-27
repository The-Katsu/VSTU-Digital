using VSTU.Digital.Messenger.Application.Abstractions.Messaging;

namespace VSTU.Digital.Messenger.Application.Tokens.Commands;

public record VerifyTokenCommand(string Token) : ICommand;