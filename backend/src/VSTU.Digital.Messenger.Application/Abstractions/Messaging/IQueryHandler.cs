using MediatR;
using VSTU.Digital.Messenger.Domain.Common.Result;

namespace VSTU.Digital.Messenger.Application.Abstractions.Messaging;

public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse> { }