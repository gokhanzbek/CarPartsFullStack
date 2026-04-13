using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Products.Queries
{
    public class GetFeaturedProductsQuery : IRequest<ApiResponse<List<ProductDto>>>
    {
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? Engine { get; set; }
    }

    public class GetFeaturedProductsQueryHandler : IRequestHandler<GetFeaturedProductsQuery, ApiResponse<List<ProductDto>>>
    {
        private readonly IAppDbContext _context;

        public GetFeaturedProductsQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<List<ProductDto>>> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Products.Include(p => p.Category).Where(p => p.IsFeatured).AsQueryable();

            if (!string.IsNullOrEmpty(request.Make) && request.Make != "Hepsi") 
                query = query.Where(p => string.IsNullOrEmpty(p.CarMake) || p.CarMake == "Hepsi" || p.CarMake == request.Make);
            if (!string.IsNullOrEmpty(request.Model) && request.Model != "Hepsi") 
                query = query.Where(p => string.IsNullOrEmpty(p.CarModel) || p.CarModel == "Hepsi" || p.CarModel == request.Model);
            if (!string.IsNullOrEmpty(request.Engine) && request.Engine != "Hepsi") 
                query = query.Where(p => string.IsNullOrEmpty(p.CarEngine) || p.CarEngine == "Hepsi" || p.CarEngine == request.Engine);

            var products = await query
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Brand = p.Brand,
                    Price = p.Price,
                    Stock = p.Stock,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : string.Empty,
                    IsFeatured = p.IsFeatured,
                    CarMake = p.CarMake,
                    CarModel = p.CarModel,
                    CarEngine = p.CarEngine,
                    ImageUrl = p.ImageUrl
                })
                .ToListAsync(cancellationToken);

            return ApiResponse<List<ProductDto>>.SuccessResponse(products);
        }
    }
}
