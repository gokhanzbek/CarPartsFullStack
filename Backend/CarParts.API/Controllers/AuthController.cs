using CarParts.Application.DTOs;
using CarParts.Application.Features.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CarParts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var command = new LoginCommand { Username = request.Username, Password = request.Password };
            var response = await _mediator.Send(command);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var command = new RegisterCommand { Username = request.Username, Email = request.Email, Password = request.Password };
            var response = await _mediator.Send(command);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}
