using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using CarParts.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Orders.Commands
{
    public class CreateOrderCommand : IRequest<ApiResponse<int>>
    {
        public int UserId { get; set; }
    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, ApiResponse<int>>
    {
        private readonly IAppDbContext _context;

        public CreateOrderCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<int>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == request.UserId, cancellationToken);

            if (cart == null || !cart.Items.Any())
            {
                return ApiResponse<int>.ErrorResponse("Cart is empty");
            }

            var order = new Order
            {
                UserId = request.UserId,
                TotalPrice = cart.Items.Sum(i => i.Quantity * (i.Product?.Price ?? 0))
            };

            foreach (var item in cart.Items)
            {
                order.Items.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Product?.Price ?? 0
                });
            }

            _context.Orders.Add(order);
            
            // Clear cart
            _context.CartItems.RemoveRange(cart.Items);

            await _context.SaveChangesAsync(cancellationToken);

            return ApiResponse<int>.SuccessResponse(order.Id, "Order placed successfully");
        }
    }
}
