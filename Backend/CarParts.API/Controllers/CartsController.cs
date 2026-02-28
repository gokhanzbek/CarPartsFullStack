using CarParts.Application.Features.Carts.Commands;
using CarParts.Application.Features.Carts.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarParts.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var response = await _mediator.Send(new GetCartQuery { UserId = GetUserId() });
            return Ok(response);
        }

        [HttpPost("items")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequestDto request) // Used a tiny internal Dto for cleaner json
        {
            var command = new AddToCartCommand
            {
                UserId = GetUserId(),
                ProductId = request.ProductId,
                Quantity = request.Quantity
            };

            var response = await _mediator.Send(command);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPut("items/{productId}")]
        public async Task<IActionResult> UpdateQuantity(int productId, [FromBody] UpdateQuantityRequestDto request)
        {
            var command = new UpdateCartItemQuantityCommand
            {
                UserId = GetUserId(),
                ProductId = productId,
                Quantity = request.Quantity
            };

            var response = await _mediator.Send(command);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpDelete("items/{productId}")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            var command = new RemoveFromCartCommand
            {
                UserId = GetUserId(),
                ProductId = productId
            };

            var response = await _mediator.Send(command);
            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }

    public class AddToCartRequestDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateQuantityRequestDto
    {
        public int Quantity { get; set; }
    }
}
