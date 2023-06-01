using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

namespace VSTU.Digital.Messenger.Application.Users.Queries.GetUserProfile;

public class GetUserQueryHandler : IQueryHandler<GetUserQuery, GetUserQueryResponse>
{
    private readonly MessengerDbContext _dbContext;

    public GetUserQueryHandler(MessengerDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<GetUserQueryResponse>> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.SingleAsync(
            x => x.Id == request.Id, 
            cancellationToken: cancellationToken);

        var profile = new GetUserQueryResponse(
            user.Username,
            user.LastName,
            user.FirstName,
            user.Patronymic,
            user.Group.Name);

        return Result.Ok(profile);
    }
}