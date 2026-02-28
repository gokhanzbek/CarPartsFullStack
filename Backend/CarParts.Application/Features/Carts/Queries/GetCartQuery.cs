using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using CarParts.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Carts.Queries
{
    public class GetCartQuery : IRequest<ApiResponse<CartDto>>
    {
        public int UserId { get; set; }
    }

    public class GetCartQueryHandler : IRequestHandler<GetCartQuery, ApiResponse<CartDto>>
    {
        private readonly IAppDbContext _context;

        public GetCartQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<CartDto>> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == request.UserId, cancellationToken);

            if (cart == null)
            {
                // Return an empty cart since it hasn't been created yet
                return ApiResponse<CartDto>.SuccessResponse(new CartDto { UserId = request.UserId });
            }

            var cartDto = new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.Product?.Name ?? "Unknown",
                    UnitPrice = i.Product?.Price ?? 0,
                    Quantity = i.Quantity
                }).ToList()
            };

            return ApiResponse<CartDto>.SuccessResponse(cartDto);
        }
    }
}
