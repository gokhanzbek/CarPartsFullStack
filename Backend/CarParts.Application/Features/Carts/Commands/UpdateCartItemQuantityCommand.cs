using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Carts.Commands
{
    public class UpdateCartItemQuantityCommand : IRequest<ApiResponse<bool>>
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; } // New total quantity
    }

    public class UpdateCartItemQuantityCommandHandler : IRequestHandler<UpdateCartItemQuantityCommand, ApiResponse<bool>>
    {
        private readonly IAppDbContext _context;

        public UpdateCartItemQuantityCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateCartItemQuantityCommand request, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == request.UserId, cancellationToken);

            if (cart == null)
            {
                return ApiResponse<bool>.ErrorResponse("Cart not found");
            }

            var item = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (item != null)
            {
                item.Quantity = request.Quantity;

                if (item.Quantity <= 0)
                {
                    cart.Items.Remove(item);
                }

                await _context.SaveChangesAsync(cancellationToken);
                return ApiResponse<bool>.SuccessResponse(true, "Cart item quantity updated");
            }

            return ApiResponse<bool>.ErrorResponse("Item not found in cart");
        }
    }
}
