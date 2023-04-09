using MediatR;
using VSTU.Digital.Messenger.Domain.Common.Result;

namespace VSTU.Digital.Messenger.Application.Abstractions.Messaging;

public interface ICommand : IRequest<Result> { }

public interface ICommand<T> : IRequest<Result<T>> { }