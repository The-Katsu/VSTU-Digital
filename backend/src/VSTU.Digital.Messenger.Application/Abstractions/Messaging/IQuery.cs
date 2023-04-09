using MediatR;
using VSTU.Digital.Messenger.Domain.Common.Result;

namespace VSTU.Digital.Messenger.Application.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> { }