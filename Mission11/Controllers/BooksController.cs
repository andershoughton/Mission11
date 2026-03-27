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
        string sortOrder = "asc",
        string category = "") // optional filter, empty means show all
    {
        var query = _context.Books.AsQueryable();

        // filter by category if one was passed in
        if (!string.IsNullOrEmpty(category))
            query = query.Where(b => b.Category == category);

        // sort by title either direction
        query = sortOrder == "desc"
            ? query.OrderByDescending(b => b.Title)
            : query.OrderBy(b => b.Title);

        // get total count before paging so frontend knows how many pages to show
        var totalBooks = await query.CountAsync();

        // grab just the books for the current page
        var books = await query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new { books, totalBooks });
    }

    // separate endpoint just for getting the list of categories for the filter buttons
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return Ok(categories);
    }
}