using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Products.Commands
{
    public class UpdateProductCommand : IRequest<ApiResponse<bool>>
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ApiResponse<bool>>
    {
        private readonly IAppDbContext _context;

        public UpdateProductCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<bool>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(new object[] { request.Id }, cancellationToken);

            if (product == null)
            {
                return ApiResponse<bool>.ErrorResponse("Product not found");
            }

            product.Name = request.Name;
            product.Brand = request.Brand;
            product.Price = request.Price;
            product.Stock = request.Stock;
            product.CategoryId = request.CategoryId;

            await _context.SaveChangesAsync(cancellationToken);

            return ApiResponse<bool>.SuccessResponse(true, "Product updated successfully");
        }
    }
}
