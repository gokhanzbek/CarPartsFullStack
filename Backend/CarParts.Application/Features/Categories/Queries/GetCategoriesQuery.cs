using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Categories.Queries
{
    public class GetCategoriesQuery : IRequest<ApiResponse<List<CategoryDto>>>
    {
    }

    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, ApiResponse<List<CategoryDto>>>
    {
        private readonly IAppDbContext _context;

        public GetCategoriesQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<List<CategoryDto>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync(cancellationToken);

            return ApiResponse<List<CategoryDto>>.SuccessResponse(categories);
        }
    }
}
