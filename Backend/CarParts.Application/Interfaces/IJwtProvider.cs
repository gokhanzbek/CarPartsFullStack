using CarParts.Domain.Entities;

namespace CarParts.Application.Interfaces
{
    public interface IJwtProvider
    {
        string Generate(AppUser user);
    }
}
