using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Auth.Commands
{
    public class LoginCommand : IRequest<ApiResponse<AuthResponse>>
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, ApiResponse<AuthResponse>>
    {
        private readonly IAppDbContext _context;
        private readonly IJwtProvider _jwtProvider;

        public LoginCommandHandler(IAppDbContext context, IJwtProvider jwtProvider)
        {
            _context = context;
            _jwtProvider = jwtProvider;
        }

        public async Task<ApiResponse<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

            if (user == null || user.PasswordHash != request.Password) // Note: Not using secure hash for simplicity
            {
                return ApiResponse<AuthResponse>.ErrorResponse("Invalid username or password");
            }

            var token = _jwtProvider.Generate(user);

            var response = new AuthResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            };

            return ApiResponse<AuthResponse>.SuccessResponse(response, "Login successful");
        }
    }
}
