using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using CarParts.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Auth.Commands
{
    public class RegisterCommand : IRequest<ApiResponse<AuthResponse>>
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ApiResponse<AuthResponse>>
    {
        private readonly IAppDbContext _context;
        private readonly IJwtProvider _jwtProvider;

        public RegisterCommandHandler(IAppDbContext context, IJwtProvider jwtProvider)
        {
            _context = context;
            _jwtProvider = jwtProvider;
        }

        public async Task<ApiResponse<AuthResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var existingUser = await _context.Users.AnyAsync(u => u.Username == request.Username || u.Email == request.Email, cancellationToken);
            if (existingUser)
            {
                return ApiResponse<AuthResponse>.ErrorResponse("Username or email is already taken");
            }

            var user = new AppUser
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = request.Password, // Simple text matching as indicated
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);

            var token = _jwtProvider.Generate(user);

            var response = new AuthResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            };

            return ApiResponse<AuthResponse>.SuccessResponse(response, "Registration successful");
        }
    }
}
