using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Data;

namespace Mission11.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookContext _context;

    public BooksController(BookContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks(
        int pageNum = 1, 
        int pageSize = 5, 
        string sortOrder = "asc")
    {
        var query = _context.Books.AsQueryable();

        query = sortOrder == "desc" 
            ? query.OrderByDescending(b => b.Title) 
            : query.OrderBy(b => b.Title);

        var totalBooks = await query.CountAsync();

        var books = await query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new
        {
            books,
            totalBooks
        });
    }
}