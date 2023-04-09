namespace VSTU.Digital.Messenger.Domain.Common.Result;

public class Result
{
    public bool Success { get; set; }
    public string Error { get; private set; } = string.Empty;
    public bool IsFailure => !Success;

    protected Result(bool success, string error)
    {
        if (success && error != string.Empty)
            throw new InvalidOperationException();
        if (!success && error == string.Empty)
            throw new InvalidOperationException();
        Success = success;
        Error = error;
    }

    public static Result Fail(string message) => new(false, message);
    public static Result<T> Fail<T>(string message) => new(default!, false, message);
    
    public static Result Ok() => new(true, string.Empty);
    public static Result<T> Ok<T>(T value) => new(value, true, string.Empty);
}