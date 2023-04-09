using VSTU.Digital.Messenger.Application.Abstractions.Messaging;
using VSTU.Digital.Messenger.Domain.Common.Result;
using VSTU.Digital.Messenger.Infrastructure.Data.Repositories;

namespace VSTU.Digital.Messenger.Application.Users.Queries.GetUsersQuery;

public sealed class GetUsersQueryHandler : IQueryHandler<GetUsersQuery, GetUsersQueryResponse>
{
    private readonly IUserRepository _userRepository;

    public GetUsersQueryHandler(IUserRepository userRepository) => 
        _userRepository = userRepository;

    public async Task<Result<GetUsersQueryResponse>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await _userRepository.GetAllAsync();
        var responseItems = users
            .Select(x => new GetUsersQueryResponseItem(
                x.Id,
                $"{x.FirstName} {x.LastName} {x.Patronymic}",
                x.Role.Name,
                x.GroupName,
                x.Username,
                x.Password))
            .ToList();
        return Result.Ok(new GetUsersQueryResponse(responseItems));
    }
}