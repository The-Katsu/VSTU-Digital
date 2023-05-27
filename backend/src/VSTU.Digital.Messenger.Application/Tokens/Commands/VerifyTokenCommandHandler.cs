using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Authentication.Jwt;

namespace VSTU.Digital.Messenger.Application.Tokens.Commands;

public class VerifyTokenCommandHandler : ICommandHandler<VerifyTokenCommand>
{
    private readonly IJwtService _service;

    public VerifyTokenCommandHandler(IJwtService service) => _service = service;

    public async Task<Result> Handle(VerifyTokenCommand request, CancellationToken cancellationToken)
    {
        var isValid = _service.ValidateToken(request.Token);

        return !isValid ? Result.Fail("token expired") : Result.Ok();
    }
}