using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Products.Commands
{
    public class DeleteProductCommand : IRequest<ApiResponse<bool>>
    {
        public int Id { get; set; }
    }

    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, ApiResponse<bool>>
    {
        private readonly IAppDbContext _context;

        public DeleteProductCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<bool>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(new object[] { request.Id }, cancellationToken);

            if (product == null)
            {
                return ApiResponse<bool>.ErrorResponse("Product not found");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync(cancellationToken);

            return ApiResponse<bool>.SuccessResponse(true, "Product deleted successfully");
        }
    }
}
