using CarParts.Application.DTOs;
using CarParts.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarParts.Application.Features.Orders.Queries
{
    public class GetUserOrdersQuery : IRequest<ApiResponse<List<OrderDto>>>
    {
        public int UserId { get; set; }
    }

    public class GetUserOrdersQueryHandler : IRequestHandler<GetUserOrdersQuery, ApiResponse<List<OrderDto>>>
    {
        private readonly IAppDbContext _context;

        public GetUserOrdersQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<List<OrderDto>>> Handle(GetUserOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(o => o.UserId == request.UserId)
                .OrderByDescending(o => o.Id) // Id is also chronological, or we can use CreatedDate
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    TotalPrice = o.TotalPrice,
                    CreatedDate = o.CreatedDate,
                    Items = o.Items.Select(i => new OrderItemDto
                    {
                        ProductId = i.ProductId,
                        ProductName = i.Product != null ? i.Product.Name : string.Empty,
                        Quantity = i.Quantity,
                        UnitPrice = i.UnitPrice
                    }).ToList()
                })
                .ToListAsync(cancellationToken);

            return ApiResponse<List<OrderDto>>.SuccessResponse(orders);
        }
    }
}
