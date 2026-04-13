using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using CarParts.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Products.Commands
{
    public class CreateProductCommand : IRequest<ApiResponse<int>>
    {
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public string? ImageUrl { get; set; }
        public string? CarMake { get; set; }
        public string? CarModel { get; set; }
        public string? CarEngine { get; set; }
        public bool IsFeatured { get; set; }
    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ApiResponse<int>>
    {
        private readonly IAppDbContext _context;

        public CreateProductCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<int>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Brand = request.Brand,
                Price = request.Price,
                Stock = request.Stock,
                CategoryId = request.CategoryId,
                ImageUrl = request.ImageUrl,
                CarMake = request.CarMake,
                CarModel = request.CarModel,
                CarEngine = request.CarEngine,
                IsFeatured = request.IsFeatured
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync(cancellationToken);

            return ApiResponse<int>.SuccessResponse(product.Id, "Product created successfully");
        }
    }
}
